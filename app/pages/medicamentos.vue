<script setup>
const items = ref([]);
const res = await useFetch('/api/medicamentos');
if(res.ok) items.value = res.data;
const updateMedicamento = async ({registro, nome, tarja}) => {
	const res = await $fetch(`/api/medicamentos/${registro}`, {
		method: 'PUT',
		body: {nome, tarja},
	});
	if(!res.ok) return alert('erro');
	const {data} = await $fetch('/api/medicamentos');
	items.value = data;
};
</script>

<template>
	<div>
		<h2>Medicamentos</h2>
		<table>
			<tr>
				<th>Registro</th>
				<th>Nome</th>
				<th>Tarja</th>
			</tr>
			<tr v-for="item in items" :key="item._id">
				<td>{{ item.registro }}</td>
				<td>
					<input type="text" v-model="item.nome">
				</td>
				<td>
					<input type="text" v-model="item.tarja">
				</td>
				<td>
					<button @click="updateMedicamento(item)">salvar</button>
				</td>
			</tr>
		</table>
	</div>
</template>