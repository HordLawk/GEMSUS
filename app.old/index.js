import {Kafka} from 'kafkajs';

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

console.log('criando');
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['broker:29092', 'broker:9092'],
    retry: {
        retries: 10,
    },
});
await sleep(1000);
console.log('produzindo');
const producer = kafka.producer();
await sleep(1000);
console.log('conectando');
await producer.connect();
await sleep(1000);
console.log('enviando');
await producer.send({
    topic: 'GEMSUS.farmaceutico',
    messages: [{
        value: JSON.stringify({
            _id: '00000000000',
            senha: '0000000000000000000000000000000000000000000000000000000000000000',
            nome: 'A',
            local: 'B',
        }).toString('utf8'),
    }],
}).then(console.log).catch(console.error);
console.log('desconectando');
await producer.disconnect();