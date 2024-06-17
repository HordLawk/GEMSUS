<script setup lang="ts">
const items = ref<{id: string, local: string, medicamento_id: string, quantidade: number}[]>([]);
const newEstoqueLocal = ref({
    quantidade: 0,
    local: '',
    medicamento_id: '',
})
const medicamentos = ref<{[key: string]: string}>({});
const estoqueLocalSocket = initializeWebSocket('/estoque-local');
estoqueLocalSocket.on('read', message => items.value.push(message));
initializeWebSocket('/medicamentos').on('read', message => medicamentos.value[message.registro] = message.nome);
</script>

<template>
    <div>
        <h2>Estoque Local</h2>
        <table>
            <tr>
                <th>Local</th>
                <th>Medicamento ID</th>
                <th>Quantidade</th>
            </tr>
            <tr v-for="item in items" :key="item.id">
                <td>{{ item.local }}</td>
                <td>{{ item.medicamento_id }}</td>
                <td>{{ item.quantidade }}</td>
            </tr>
        </table>
        <h3>Adicionar Medicamento ao Estoque Local</h3>
        <form @submit.prevent="estoqueLocalSocket.emit('write', newEstoqueLocal)">
            <label for="quantidade">Quantidade</label>
            <input type="number" id="quantidade" v-model.number="newEstoqueLocal.quantidade" required />
            <label for="local">Local</label>
            <input id="local" v-model="newEstoqueLocal.local" maxlength="64" required/>
            <label for="medicamento_id">Medicamento</label>
            <select id="medicamento_id" v-model="newEstoqueLocal.medicamento_id" required>
                <option v-for="(nome, registro) in medicamentos" :key="registro" :value="registro">{{ nome }}</option>
            </select>
            <button type="submit">Adicionar</button>
        </form>
    </div>
</template>
  
