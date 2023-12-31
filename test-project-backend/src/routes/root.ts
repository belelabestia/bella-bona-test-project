import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/hello", () => "Hello! Looks like everything's working.");
};

export default root;
