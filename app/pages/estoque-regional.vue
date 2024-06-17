<script setup>
const items = ref([]);
const regioes = ref({});
const medicamentos = ref({});
const newItem = ref({
    regiao: '',
    medicamento_id: '',
})
// const resEstoque = await useFetch('/api/estoque-regional');
// if(resEstoque.ok) items.value = resEstoque.data;
// const resRegioes = await useFetch('/api/regioes');
// const regioes = resRegioes.ok ? resRegioes.data : [];
const updateEstoque = async updateData => {
    // const res = await $fetch('/api/estoque-regional', {
    // 	method: 'PUT',
    // 	body: updateData,
    // });
    // if(!res.ok) return alert('erro');
    // const {data} = await $fetch('/api/estoque-regional');
    // items.value = data;
};
const addEstoque = async () => {
    // const res = await $fetch('/api/estoque-regional', {
    // 	method: 'PUT',
    // 	body: {
    // 		local: newItem.value.regiao,
    // 		medicamento_id: newItem.value.medicamento_id,
    // 		quantidade: 0,
    // 	},
    // });
    // if(!res.ok) return alert('erro');
    // const {data} = await $fetch('/api/estoque-regional');
    // items.value = data;
};
initializeWebSocket('/pacientes').on('hello', message => items.value.push(message));
initializeWebSocket('/secretarias').on('hello', message => regioes.value[message.cnpj] = message.nome);
initializeWebSocket('/medicamentos').on('hello', message => medicamentos.value[message.registro] = message.nome);
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
            <tr v-for="item in items" :key="item._id">
                <td>{{ regioes[item.regiao] }}</td>
                <td>{{ medicamentos[item.medicamento_id] }}</td>
                <td>
                    <input type="text" v-model="item.quantidade">
                </td>
                <td>
                    <button @click="updateEstoque(item)">salvar</button>
                </td>
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
  
