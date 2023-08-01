import { ProductOrder } from "@prisma/client";
import { FastifyPluginAsync, FastifyRequest } from "fastify";

type GetRequest = FastifyRequest<{ Querystring: { orderId?: number, customerId?: number } }>;

type PostRequest = FastifyRequest<{
  Params: { id: number },
  Body: Pick<ProductOrder, "name" | "quantity" | "status">
}>;

const products: FastifyPluginAsync = async fastify => {
  fastify.get(
    "/",
    {
      schema: {
        querystring: {
          orderId: { type: "integer" },
          customerId: { type: "integer" }
        }
      }
    },
    (request: GetRequest) => {
      const { orderId, customerId } = request.query;

      return fastify.prisma.productOrder.findMany({
        where: {
          orderId,
          order: customerId !== undefined
            ? { customerId }
            : undefined
        },
        orderBy: {
          orderDate: "asc"
        }
      });
    }
  );

  fastify.post(
    "/:id",
    {
      schema: {
        params: {
          id: { type: "integer" }
        },
        body: {
          name: { type: "string", minLength: 1 },
          quantity: { type: "integer" },
          status: { type: "string", enum: ["processing", "done"] }
        }
      }
    },
    async (request: PostRequest, reply) => {
      const { id } = request.params;
      const { name, quantity, status } = request.body;

      const productOrder = await fastify.prisma.productOrder.findUnique({ where: { id } });

      if (productOrder === null) return reply.notFound();

      await fastify.prisma.productOrder.update({
        where: { id },
        data: { name, quantity, status }
      })
    }
  );
};

export default products;
