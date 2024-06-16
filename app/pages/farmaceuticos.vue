<script setup>
const items = ref([]);
// const res = await useFetch('/api/farmaceuticos');
// if(res.ok) items.value = res.data;
const updateFarmaceutico = async ({ cpf, nome, local }) => {
    // const res = await $fetch(`/api/farmaceuticos/${cpf}`, {
    // 	method: 'PUT',
    // 	body: {nome, local},
    // });
    // if(!res.ok) return alert('erro');
    // const {data} = await $fetch('/api/famraceuticos');
    // items.value = data;
};
initializeWebSocket('/farmaceuticos').on('hello', console.log);
</script>

<template>
    <div>
        <h2>Farmaceuticos</h2>
        <table>
            <tr>
                <th>CPF</th>
                <th>Nome</th>
                <th>Local</th>
            </tr>
            <tr v-for="item in items" :key="item._id">
                <td>{{ item.cpf }}</td>
                <td>
                    <input type="text" v-model="item.nome">
                </td>
                <td>
                    <input type="text" v-model="item.local">
                </td>
                <td>
                    <button @click="updateFarmaceutico(item)">salvar</button>
                </td>
            </tr>
        </table>
    </div>
</template>