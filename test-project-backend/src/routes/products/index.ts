import { Order } from "@prisma/client";
import { FastifyPluginAsync, FastifyRequest } from "fastify";

type GetRequest = FastifyRequest<{ Querystring: { orderId?: number, customerId?: number } }>;
type PostRequest = FastifyRequest<{ Params: { id: number }, Body: Pick<Order, "status"> }>;

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
        }
      });
    }
  );

  // TODO
  fastify.post(
    "/:id",
    {
      schema: {
        params: {
          id: { type: "integer" }
        },
        body: {
          status: { type: "string", enum: ["processing", "done"] }
        }
      }
    },
    async (request: PostRequest, reply) => {
      const { id } = request.params;
      const { status } = request.body;

      const order = await fastify.prisma.order.findUnique({ where: { id } });

      if (order === null) return reply.notFound();
      await fastify.prisma.order.update({ where: { id }, data: { status } })
    }
  );
};

export default products;
