<script setup>
const items = ref([]);
const newItem = ref({
	local: '',
	medicamento_id: '',
})
const res = await useFetch('/api/estoque-local');
if(res.ok) items.value = res.data;
const updateEstoque = async updateData => {
	const res = await $fetch('/api/estoque-local', {
		method: 'PUT',
		body: updateData,
	});
	if(!res.ok) return alert('erro');
	const {data} = await $fetch('/api/estoque-local');
	items.value = data;
};
const addEstoque = async () => {
	const res = await $fetch('/api/estoque-local', {
		method: 'PUT',
		body: {
			local: newItem.value.local,
			medicamento_id: newItem.value.medicamento_id,
			quantidade: 0,
		},
	});
	if(!res.ok) return alert('erro');
	const {data} = await $fetch('/api/estoque-local');
	items.value = data;
};
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
			<tr v-for="item in items" :key="item._id">
				<td>{{ item.local }}</td>
				<td>{{ item.medicamento_id }}</td>
				<td>
					<input type="text" v-model="item.quantidade">
				</td>
				<td>
					<button @click="updateEstoque(item)">salvar</button>
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
  
