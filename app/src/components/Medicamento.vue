<template>
	<div>
		<h2>Medicamento</h2>
		<ul>
			<li v-for="item in items" :key="item._id">Nome: {{ item.nome }} - Tarja: {{ item.tarja }}</li>
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
			axios.get('/api/medicamento')
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
  