import kafka from '~/server/utils/kafka';

export default defineEventHandler(async event => {
    const producer = kafka.producer();
    console.log('conectando');
    await producer.connect();
    console.log('enviando');
    await producer.send({
        topic: 'GEMSUS.farmaceutico',
        messages: [{
            value: JSON.stringify({
                _id: '00000000000',
                senha: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
                nome: 'A',
                local: 'B',
            }).toString('utf8'),
        }],
    }).then(console.log).catch(console.error);
    console.log('desconectando');
    await producer.disconnect();
    const consumer = kafka.consumer({ groupId: 'farmaceuticos' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'GEMSUS.farmaceutico', fromBeginning: true });
    await consumer.run({eachMessage: async ({ message }) => console.log(message.value)});
    await consumer.disconnect();
    return {status: 201};
})