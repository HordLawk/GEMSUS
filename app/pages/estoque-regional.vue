<script setup lang="ts">
const items = ref<{id: string, regiao: string, medicamento_id: string, quantidade: number}[]>([]);
const regioes = ref<{[key: string]: string}>({});
const medicamentos = ref<{[key: string]: string}>({});
const newItem = ref({
    regiao: '',
    medicamento_id: '',
})
initializeWebSocket('/estoque-regional').on('read', message => items.value.push(message));
initializeWebSocket('/secretarias').on('read', message => regioes.value[message.cnpj] = message.nome);
initializeWebSocket('/medicamentos').on('read', message => medicamentos.value[message.registro] = message.nome);
const addEstoque = () => {};
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
        <form @submit.prevent="addEstoque">
            <label>
                Região:
                <select v-model="newItem.regiao" required>
                    <option value=""></option>
                    <option v-for="(cnpj, nome) in regioes" :key="cnpj" :value="cnpj">{{ nome }}</option>
                </select>
            </label>
            <label>Medicamento ID: <input v-model="newItem.medicamento_id" required /></label>
            <button type="submit">Adicionar</button>
        </form>
    </div>
</template>
  
