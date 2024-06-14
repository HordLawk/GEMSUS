<template>
	<div>
		<h2>Paciente</h2>
		<ul>
			<li v-for="item in items" :key="item._id">Nome: {{ item.nome }} - Posto: {{ item.posto }}</li>
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
			axios.get('/api/paciente')
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