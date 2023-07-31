import { Order } from "@prisma/client";
import { FastifyPluginAsync, FastifyRequest } from "fastify";

type GetRequest = FastifyRequest<{ Querystring: { customerId?: number } }>;
type PostRequest = FastifyRequest<{ Params: { id: number }, Body: Pick<Order, "status"> }>;

const getOptions = {
  schema: {
    querystring: {
      customerId: { type: "integer" }
    }
  }
};

const postOptions = {
  schema: {
    params: {
      id: { type: "integer" }
    },
    body: {
      status: { type: "string", enum: ["processing", "done"] }
    }
  }
};

const orders: FastifyPluginAsync = async fastify => {
  fastify.get("/", getOptions, (request: GetRequest) => {
    const { customerId } = request.query;
    return fastify.prisma.order.findMany({ where: { customerId } })
  });

  fastify.post("/:id", { ...postOptions }, async (request: PostRequest, reply) => {
    const { id } = request.params;
    const { status } = request.body;

    const order = await fastify.prisma.order.findUnique({ where: { id } });

    if (order === null) return reply.notFound();
    await fastify.prisma.order.update({ where: { id }, data: { status } })
  });
};

export default orders;
