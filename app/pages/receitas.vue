<script setup lang="ts">
const items = ref<{id: string, data: string, medicamento_id: string, paciente_id: string, medico_id: string}[]>([]);
const medicamentos = ref<{[key: string]: string}>({});
const pacientes = ref<{[key: string]: string}>({});
const medicos = ref<{[key: string]: string}>({});
initializeWebSocket('/receitas').on('read', message => items.value.push(message));
initializeWebSocket('/medicamentos').on('read', message => medicamentos.value[message.registro] = message.nome);
initializeWebSocket('/pacientes').on('read', message => pacientes.value[message.cpf] = message.nome);
initializeWebSocket('/medicos').on('read', message => medicos.value[message.crm] = message.nome);
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
            <tr v-for="item in items" :key="item.id">
                <td>{{ item.data }}</td>
                <td>{{ medicamentos[item.medicamento_id] }}</td>
                <td>{{ pacientes[item.paciente_id] }}</td>
                <td>{{ medicos[item.medico_id] }}</td>
            </tr>
        </table>
    </div>
</template>