<script setup>
const items = ref([]);
const res = await useFetch('/api/pacientes');
if(res.ok) items.value = res.data;
const resRegioes = await useFetch('/api/regioes');
const regioes = resRegioes.ok ? resRegioes.data : [];
const updatePaciente = async ({cpf, nome, regiao, convenio, posto}) => {
	const res = await $fetch(`/api/pacientes/${cpf}`, {
		method: 'PUT',
		body: {nome, regiao, convenio, posto},
	});
	if(!res.ok) return alert('erro');
	const {data} = await $fetch('/api/pacientes');
	items.value = data;
};
</script>

<template>
	<div>
		<h2>Pacientes</h2>
		<table>
			<tr>
				<th>CPF</th>
				<th>Nome</th>
				<th>Regiao</th>
				<th>Convenio</th>
				<th>Posto</th>
			</tr>
			<tr v-for="item in items" :key="item._id">
				<td>{{ item.cpf }}</td>
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
					<input type="text" v-model="item.convenio">
				</td>
				<td>
					<input type="text" v-model="item.posto">
				</td>
				<td>
					<button @click="updatePaciente(item)">salvar</button>
				</td>
			</tr>
		</table>
	</div>
</template>