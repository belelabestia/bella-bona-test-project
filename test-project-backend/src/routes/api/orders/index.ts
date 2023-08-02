import { Order } from "@prisma/client";
import { FastifyPluginAsync, FastifyRequest } from "fastify";

type GetRequest = FastifyRequest<{ Querystring: { customerId?: number } }>;

type PostRequest = FastifyRequest<{
  Params: { id: number },
  Body: Pick<Order, "status">
}>;

const orders: FastifyPluginAsync = async fastify => {
  fastify.get(
    "/",
    {
      schema: {
        querystring: {
          customerId: { type: "integer" }
        }
      }
    },
    (request: GetRequest) => {
      const { customerId } = request.query;

      return fastify.prisma.order.findMany({
        where: { customerId },
        orderBy: { date: "asc" },
        include: {
          orderedProducts: {
            select: {
              id: true,
              name: true,
              status: true
            }
          }
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
          status: { type: "string", enum: ["processing", "done"] }
        }
      }
    },
    async (request: PostRequest, reply) => {
      const { id } = request.params;
      const { status } = request.body;

      const order = await fastify.prisma.order.findUnique({ where: { id } });

      if (order === null) return reply.notFound();

      await fastify.prisma.order.update({
        where: { id },
        data: {
          status,
          orderedProducts: {
            updateMany: {
              where: { orderId: id },
              data: { status }
            }
          }
        }
      })
    }
  );
};

export default orders;
