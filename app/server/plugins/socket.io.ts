import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { Kafka } from 'kafkajs';

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

    io.of('/farmaceuticos').on("connection", async (socket) => {
        const consumer = kafka.consumer({ groupId: socket.id });
        await consumer.connect();
        await consumer.subscribe({ topic: 'GEMSUS.farmaceutico', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const objStr = message.value?.toString('utf-8');
                const obj = objStr ? JSON.parse(objStr) : {};
                const { _id: cpf, nome, local } = JSON.parse(obj.payload).fullDocument;
                socket.emit('hello', { cpf, nome, local });
            }
        });
        socket.on("disconnect", consumer.disconnect);
    });

    io.of('/secretarias').on("connection", async (socket) => {
        const consumer = kafka.consumer({ groupId: socket.id });
        await consumer.connect();
        await consumer.subscribe({ topic: 'GEMSUS.secretaria', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const objStr = message.value?.toString('utf-8');
                const obj = objStr ? JSON.parse(objStr) : {};
                const { _id: cnpj, nome, regiao, estado, cidade } = JSON.parse(obj.payload).fullDocument;
                socket.emit('hello', { cnpj, nome, regiao, estado, cidade });
            }
        });
        socket.on("disconnect", consumer.disconnect);
    });

    io.of('/medicamentos').on("connection", async (socket) => {
        const consumer = kafka.consumer({ groupId: socket.id });
        await consumer.connect();
        await consumer.subscribe({ topic: 'GEMSUS.medicamento', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const objStr = message.value?.toString('utf-8');
                const obj = objStr ? JSON.parse(objStr) : {};
                const { _id: registro, nome, tarja } = JSON.parse(obj.payload).fullDocument;
                socket.emit('hello', { registro, nome, tarja });
            }
        });
        socket.on("disconnect", consumer.disconnect);
    });

    io.of('/estoque-local').on("connection", async (socket) => {
        const consumer = kafka.consumer({ groupId: socket.id });
        await consumer.connect();
        await consumer.subscribe({ topic: 'GEMSUS.estoqueLocal', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const objStr = message.value?.toString('utf-8');
                const obj = objStr ? JSON.parse(objStr) : {};
                const { _id: {$oid: id}, quantidade, local, medicamento_id } = JSON.parse(obj.payload).fullDocument;
                socket.emit('hello', { id, quantidade, local, medicamento_id });
            }
        });
        socket.on("disconnect", consumer.disconnect);
    });

    io.of('/pacientes').on("connection", async (socket) => {
        const consumer = kafka.consumer({ groupId: socket.id });
        await consumer.connect();
        await consumer.subscribe({ topic: 'GEMSUS.paciente', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const objStr = message.value?.toString('utf-8');
                const obj = objStr ? JSON.parse(objStr) : {};
                const { _id: cpf, nome, convenio, posto, secretaria_id: regiao } = JSON.parse(obj.payload).fullDocument;
                socket.emit('hello', { cpf, nome, convenio, posto, regiao });
            }
        });
        socket.on("disconnect", consumer.disconnect);
    });

    io.of('/medicos').on("connection", async (socket) => {
        const consumer = kafka.consumer({ groupId: socket.id });
        await consumer.connect();
        await consumer.subscribe({ topic: 'GEMSUS.medico', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const objStr = message.value?.toString('utf-8');
                const obj = objStr ? JSON.parse(objStr) : {};
                const { _id: crm, nome, secretaria_id: regiao } = JSON.parse(obj.payload).fullDocument;
                socket.emit('hello', { crm, nome, regiao });
            }
        });
        socket.on("disconnect", consumer.disconnect);
    });

    io.of('/estoque-regional').on("connection", async (socket) => {
        const consumer = kafka.consumer({ groupId: socket.id });
        await consumer.connect();
        await consumer.subscribe({ topic: 'GEMSUS.estoqueRegional', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const objStr = message.value?.toString('utf-8');
                const obj = objStr ? JSON.parse(objStr) : {};
                const { _id: {$oid: id}, quantidade, secretaria_id: regiao, medicamento } = JSON.parse(obj.payload).fullDocument;
                socket.emit('hello', { id, regiao, quantidade, medicamento });
            }
        });
        socket.on("disconnect", consumer.disconnect);
    });

    io.of('/receitas').on("connection", async (socket) => {
        const consumer = kafka.consumer({ groupId: socket.id });
        await consumer.connect();
        await consumer.subscribe({ topic: 'GEMSUS.receita', fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message }) => {
                const objStr = message.value?.toString('utf-8');
                const obj = objStr ? JSON.parse(objStr) : {};
                console.log(obj);
                const { _id: {$oid: id}, data: {$date: ms}, medicamento_id, paciente_id, medico_id } = JSON.parse(obj.payload).fullDocument;
                socket.emit('hello', { id, data: new Date(ms).toISOString(), medicamento_id, paciente_id, medico_id });
            }
        });
        socket.on("disconnect", consumer.disconnect);
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