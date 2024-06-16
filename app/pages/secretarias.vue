<script setup>
const items = ref([]);
// const res = await useFetch('/api/secretarias');
// if(res.ok) items.value = res.data;
const updateSecretaria = async ({cnpj, nome, regiao, estado, cidade}) => {
	// const res = await $fetch(`/api/secretarias/${cnpj}`, {
	// 	method: 'PUT',
	// 	body: {nome, regiao, estado, cidade},
	// });
	// if(!res.ok) return alert('erro');
	// const {data} = await $fetch('/api/secretarias');
	// items.value = data;
};
initializeWebSocket('/secretarias').on('hello', message => items.value.push(message));
</script>

<template>
	<div>
		<h2>Secretarias</h2>
		<table>
			<tr>
				<th>CNPJ</th>
				<th>Nome</th>
				<th>Regiao</th>
				<th>Estado</th>
				<th>Cidade</th>
			</tr>
			<tr v-for="item in items" :key="item.cnpj">
				<td>{{ item.cnpj }}</td>
				<td>
					<input type="text" v-model="item.nome">
				</td>
				<td>
					<input type="text" v-model="item.estado">
				</td>
				<td>
					<input type="text" v-model="item.cidade">
				</td>
				<td>
					<button @click="updateSecretaria(item)">salvar</button>
				</td>
			</tr>
		</table>
	</div>
</template>