import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database = DatabaseMemory;

// CRIAR VIDEOS
server.post("/videos", (request, response) => {
  const { title, description, duration } = request.body;

  database.create({
    title,
    description,
    duration,
  });

  return response.status(201).send();
});

// LISTAR VIDEOS
server.get("/videos", (request) => {
  const search = request.query.search;
  const videos = database.list(search);
  return videos;
});

// ATUALIZAR VIDEOS
server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", (request, response) => {
  const videoId = request.params.id;
  database.delete(videoId);

  return response.status(204).send();
});

server.listen({
  port: 3333,
});
