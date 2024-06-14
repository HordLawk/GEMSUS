<template>
	<div>
		<h2>Estoque Local</h2>
		<h3>Adicionar Medicamento ao Estoque Local</h3>
		<form @submit.prevent="addMedicamento">
			<label>Local: <input v-model="newMedicamento.local" required /></label>
			<label>Medicamento ID: <input v-model="newMedicamento.medicamento_id" required /></label>
			<label>Quantidade: <input v-model="newMedicamento.quantidade" type="number" required /></label>
			<button type="submit">Adicionar</button>
		</form>
  
		<h3>Remover Medicamento do Estoque Local</h3>
		<form @submit.prevent="removeMedicamento">
			<label>Local: <input v-model="removeData.local" required /></label>
			<label>Medicamento ID: <input v-model="removeData.medicamento_id" required /></label>
			<button type="submit">Remover</button>
		</form>
		<ul>
			<li v-for="item in items" :key="item._id">Quantidade: {{ item.quantidade }} - Local: {{ item.local }} - Medicamento ID: {{ item.medicamento_id }}</li>
		</ul>
	</div>
</template>
  
<script>
import axios from 'axios';
  
export default {
	data() {
		return {
			items: [],
			newMedicamento: {
				local: '',
				medicamento_id: '',
				quantidade: 0,
			},
			removeData: {
				local: '',
				medicamento_id: '',
			},
		};
	},
	methods: {
		fetchData() {
			axios.get('/api/estoqueLocal')
				.then(response => {
					this.items = response.data;
				})
				.catch(error => {
					console.error(error);
				});
		},
		addMedicamento() {
			axios.post('/api/estoqueLocal', this.newMedicamento)
				.then(response => {
					this.fetchData();
				})
				.catch(error => {
				console.error(error);
				});
		},
		removeMedicamento() {
			axios.delete('/api/estoqueLocal', { data: this.removeData })
				.then(response => {
					this.fetchData();
				})
				.catch(error => {
					console.error(error);
				});
		},
	},
	created() {
		this.fetchData();
	},
};
</script>  