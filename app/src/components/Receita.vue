<template>
	<div>
		<h2>Receita</h2>
		<ul>
			<li v-for="item in items" :key="item._id">Data: {{ item.data }} - Medicamento ID: {{ item.medicamento_id }} - Paciente ID: {{ item.paciente_id }} - Médico ID: {{ item.medico_id }}</li>
		</ul>
	</div>
</template>
  
<script>
import axios from 'axios';
  
export default {
	data() {
		return {
			items: [],
		};
	},
	methods: {
		fetchData() {
			axios.get('/api/receita')
				.then(response => {
					this.items = response.data;
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