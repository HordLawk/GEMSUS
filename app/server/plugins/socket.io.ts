import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import {Kafka} from 'kafkajs';

console.log('criando');
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['broker:29092', 'broker:9092'],
    retry: {
        retries: 10,
    },
});

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  io.bind(engine);

  io.of('farmaceuticos').on("connection", async (socket) => {
    const consumer = kafka.consumer({ groupId: socket.id });
    await consumer.connect();
    await consumer.subscribe({ topic: 'GEMSUS.farmaceutico', fromBeginning: true });
    await consumer.run({eachMessage: async ({ message }) => void(socket.emit('hello', message.value))});
    socket.conn.on("close", consumer.disconnect);
  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        const nodeContext = peer.ctx.node;
        const req = nodeContext.req;

        // @ts-expect-error private method
        engine.prepare(req);

        const rawSocket = nodeContext.req.socket;
        const websocket = nodeContext.ws;

        // @ts-expect-error private method
        engine.onWebSocket(req, rawSocket, websocket);
      }
    }
  }));
});