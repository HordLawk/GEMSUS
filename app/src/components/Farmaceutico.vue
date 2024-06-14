<template>
	<div>
		<h2>Farmaceutico</h2>
		<ul>
			<li v-for="item in items" :key="item._id">Nome: {{ item.nome }} - Local: {{ item.local }}</li>
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
			axios.get('/api/farmaceutico')
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