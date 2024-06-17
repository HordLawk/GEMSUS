<script setup lang="ts">
const items = ref<{id: string, local: string, medicamento_id: string, quantidade: number}[]>([]);
const newItem = ref({
    local: '',
    medicamento_id: '',
})
initializeWebSocket('/estoque-local').on('read', message => items.value.push(message));
const addEstoque = () => {};
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
                <td>
                    <input type="text" v-model="item.quantidade">
                </td>
            </tr>
        </table>
        <h3>Adicionar Medicamento ao Estoque Local</h3>
        <form @submit.prevent="addEstoque">
            <label>Local: <input v-model="newItem.local" required /></label>
            <label>Medicamento ID: <input v-model="newItem.medicamento_id" required /></label>
            <button type="submit">Adicionar</button>
        </form>
    </div>
</template>
  
