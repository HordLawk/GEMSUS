import kafka from '~/server/utils/kafka';

export default defineEventHandler(async event => {
    const consumer = kafka.consumer({ groupId: 'farmaceuticos' });
    await consumer.connect();
    await consumer.subscribe({ topics: ['farmaceutico'], fromBeginning: true });
    await consumer.run({eachMessage: async ({ message }) => console.log(message.value)});
    await consumer.disconnect();
    return {status: 201};
})