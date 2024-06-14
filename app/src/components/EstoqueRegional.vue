<template>
	<div>
		<h2>Estoque Regional</h2>
		<h3>Adicionar Medicamento ao Estoque Regional</h3>
		<form @submit.prevent="addMedicamento">
			<label>Secretaria ID: <input v-model="newMedicamento.secretaria_id" required /></label>
			<label>Medicamento ID: <input v-model="newMedicamento.medicamento_id" required /></label>
			<label>Quantidade: <input v-model="newMedicamento.quantidade" type="number" required /></label>
			<button type="submit">Adicionar</button>
		</form>
  
		<h3>Remover Medicamento do Estoque Regional</h3>
		<form @submit.prevent="removeMedicamento">
			<label>Secretaria ID: <input v-model="removeData.secretaria_id" required /></label>
			<label>Medicamento ID: <input v-model="removeData.medicamento_id" required /></label>
			<button type="submit">Remover</button>
		</form>
		<ul>
			<li v-for="item in items" :key="item._id">Quantidade: {{ item.quantidade }} - Secretaria ID: {{ item.secretaria_id }} - Medicamento ID: {{ item.medicamento_id }}</li>
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
				secretaria_id: '',
				medicamento_id: '',
				quantidade: 0,
			},
			removeData: {
				secretaria_id: '',
				medicamento_id: '',
			},
		};
	},
	methods: {
		fetchData() {
			axios.get('/api/estoqueRegional')
				.then(response => {
					this.items = response.data;
				})
				.catch(error => {
					console.error(error);
				});
		},
		addMedicamento() {
			axios.post('/api/estoqueRegional', this.newMedicamento)
				.then(response => {
					this.fetchData();
				})
		  		.catch(error => {
					console.error(error);
				});
		},
		removeMedicamento() {
			axios.delete('/api/estoqueRegional', { data: this.removeData })
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