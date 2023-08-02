import { OrderedProduct, Status } from "@prisma/client";
import { FastifyPluginAsync, FastifyRequest } from "fastify";

type GetRequest = FastifyRequest<{ Querystring: { orderId?: number, customerId?: number } }>;

type PostRequest = FastifyRequest<{
  Params: { id: number },
  Body: Pick<OrderedProduct, "name" | "quantity" | "status">
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

      return fastify.prisma.orderedProduct.findMany({
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

      const orderedProduct = await fastify.prisma.orderedProduct.findUnique({
        where: { id },
        include: {
          order: {
            include: {
              orderedProducts: {
                where: { id: { not: { equals: id } } },
                select: { status: true }
              }
            }
          }
        }
      });

      if (orderedProduct === null) return reply.notFound();

      const orderStatus = orderedProduct.order.orderedProducts
        .map(orderedProduct => orderedProduct.status)
        .concat(status)
        .reduce(reduceStatus, "done");

      await fastify.prisma.orderedProduct.update({
        where: { id },
        data: {
          name,
          quantity,
          status,
          order: {
            update: { data: { status: orderStatus } }
          }
        }
      });
    }
  );
};

const reduceStatus = (final: Status, next: Status): Status => final !== next ? "processing" : final;

export default products;
