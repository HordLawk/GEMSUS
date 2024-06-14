<script setup>
const items = ref([]);
const res = await useFetch('/api/medicos');
if(res.ok) items.value = res.data;
const resRegioes = await useFetch('/api/regioes');
const regioes = resRegioes.ok ? resRegioes.data : [];
const updateMedico = async ({crm, nome, regiao}) => {
	const res = await $fetch(`/api/medicos/${crm}`, {
		method: 'PUT',
		body: {nome, regiao},
	});
	if(!res.ok) return alert('erro');
	const {data} = await $fetch('/api/medicos');
	items.value = data;
};
</script>

<template>
	<div>
		<h2>Medicos</h2>
		<table>
			<tr>
				<th>CRM</th>
				<th>Nome</th>
				<th>Regiao</th>
			</tr>
			<tr v-for="item in items" :key="item._id">
				<td>{{ item.crm }}</td>
				<td>
					<input type="text" v-model="item.nome">
				</td>
				<td>
					<select v-model="item.regiao" required >
						<option value=""></option>
						<option v-for="(cnpj, nome) in regioes" :key="cnpj" :value="cnpj">{{ nome }}</option>
					</select>
				</td>
				<td>
					<button @click="updateMedico(item)">salvar</button>
				</td>
			</tr>
		</table>
	</div>
</template>