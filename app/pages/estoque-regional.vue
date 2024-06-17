<script setup lang="ts">
const items = ref<{id: string, regiao: string, medicamento_id: string, quantidade: number}[]>([]);
const newEstoqueRegional = ref({
    quantidade: 0,
    secretaria_id: '',
    medicamento_id: '',
})
const regioes = ref<{[key: string]: string}>({});
const medicamentos = ref<{[key: string]: string}>({});
const estoqueRegionalSocket = initializeWebSocket('/estoque-regional');
estoqueRegionalSocket.on('read', message => items.value.push(message));
initializeWebSocket('/secretarias').on('read', message => regioes.value[message.id] = message.nome);
initializeWebSocket('/medicamentos').on('read', message => medicamentos.value[message.registro] = message.nome);
</script>

<template>
    <div>
        <h2>Estoque regional</h2>
        <table>
            <tr>
                <th>Região</th>
                <th>Medicamento ID</th>
                <th>Quantidade</th>
            </tr>
            <tr v-for="item in items" :key="item.id">
                <td>{{ regioes[item.regiao] }}</td>
                <td>{{ medicamentos[item.medicamento_id] }}</td>
                <td>{{ item.quantidade }}</td>
            </tr>
        </table>
        <h3>Adicionar Medicamento ao Estoque Regional</h3>
        <form @submit.prevent="estoqueRegionalSocket.emit('write', newEstoqueRegional)">
            <label for="quantidade">Quantidade</label>
            <input type="number" id="quantidade" v-model.number="newEstoqueRegional.quantidade" required />
            <label for="secretaria_id">Região</label>
            <select id="secretaria_id" v-model="newEstoqueRegional.secretaria_id" required>
                <option v-for="(nome, id) in regioes" :key="id" :value="id">{{ nome }}</option>
            </select>
            <label for="medicamento_id">Medicamento</label>
            <select id="medicamento_id" v-model="newEstoqueRegional.medicamento_id" required>
                <option v-for="(nome, registro) in medicamentos" :key="registro" :value="registro">{{ nome }}</option>
            </select>
            <button type="submit">Adicionar</button>
        </form>
    </div>
</template>
  
