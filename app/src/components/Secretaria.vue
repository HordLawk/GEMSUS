<template>
	<div>
		<h2>Secretaria</h2>
		<ul>
			<li v-for="item in items" :key="item._id">Nome: {{ item.nome }} - Região: {{ item.regiao }}</li>
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
			axios.get('/api/secretaria')
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