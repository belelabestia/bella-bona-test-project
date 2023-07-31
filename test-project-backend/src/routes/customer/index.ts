import { FastifyPluginAsync, FastifyRequest } from "fastify";

type Request = FastifyRequest<{ Params: { id: number } }>;

const customer: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/:id", { schema: { params: { id: { type: "number" } } } }, async (request: Request, reply) => {
    const { id } = request.params;
    const customer = await fastify.prisma.customer.findUnique({ where: { id } });

    if (customer === null) return reply.notFound();
    return customer;
  });
};

export default customer;
