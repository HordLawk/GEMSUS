// import consumer  from "~/server/utils/consumer";

export default defineEventHandler(async event => {
    // await consumer.subscribe({ topic: 'GEMSUS.farmaceutico', fromBeginning: true });
    // await consumer.run({eachMessage: async ({ message }) => console.log(message.value)});
    return {status: 201};
})