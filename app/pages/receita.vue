<script setup>
const items = ref([]);
const medicamentos = ref([]);
const pacientes = ref([]);
const medicos = ref([]);
initializeWebSocket('/receitas').on('hello', message => {
	console.log(message);
	items.value.push(message);
});
initializeWebSocket('/medicamentos').on('hello', message => medicamentos.value.push(message));
initializeWebSocket('/pacientes').on('hello', message => pacientes.value.push(message));
initializeWebSocket('/medicos').on('hello', message => medicos.value.push(message));
const updateReceita = () => {};
</script>

<template>
	<div>
		<h2>Receitas</h2>
		<table>
			<tr>
				<th>Data</th>
				<th>Medicamento</th>
				<th>Paciente</th>
				<th>Médico</th>
			</tr>
			<tr v-for="item in items" :key="item._id">
				<td>
					<input type="date" v-model="item.data">
				</td>
				<td>
					<select v-model="item.medicamento_id" required >
						<option value=""></option>
						<option v-for="(registro, nome) in medicamentos" :key="registro" :value="registro">{{ nome }}</option>
					</select>
				</td>
				<td>
					<select v-model="item.paciente_id" required >
						<option value=""></option>
						<option v-for="(cpf, nome) in pacientes" :key="cpf" :value="cpf">{{ nome }}</option>
					</select>
				</td>
				<td>
					<select v-model="item.medico_id" required >
						<option value=""></option>
						<option v-for="(crm, nome) in medicos" :key="crm" :value="crm">{{ nome }}</option>
					</select>
				</td>
				<td>
					<button @click="updateReceita(item)">salvar</button>
				</td>
			</tr>
		</table>
	</div>
</template>