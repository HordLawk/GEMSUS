<script setup lang="ts">
const items = ref<{id: string, data: string, medicamento_id: string, paciente_id: string, medico_id: string}[]>([]);
const medicamentos = ref<{registro: string, nome: string}[]>([]);
const pacientes = ref<{cpf: string, nome: string}[]>([]);
const medicos = ref<{crm: string, nome: string}[]>([]);
initializeWebSocket('/receitas').on('read', message => items.value.push(message));
initializeWebSocket('/medicamentos').on('read', message => medicamentos.value.push(message));
initializeWebSocket('/pacientes').on('read', message => pacientes.value.push(message));
initializeWebSocket('/medicos').on('read', message => medicos.value.push(message));
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
                <td>
                    <input type="date" v-model="item.data">
                </td>
                <td>
                    <select v-model="item.medicamento_id" required>
                        <option value=""></option>
                        <option v-for="{registro, nome} in medicamentos" :key="registro" :value="registro">{{ nome }}
                        </option>
                    </select>
                </td>
                <td>
                    <select v-model="item.paciente_id" required>
                        <option value=""></option>
                        <option v-for="{cpf, nome} in pacientes" :key="cpf" :value="cpf">{{ nome }}</option>
                    </select>
                </td>
                <td>
                    <select v-model="item.medico_id" required>
                        <option value=""></option>
                        <option v-for="{crm, nome} in medicos" :key="crm" :value="crm">{{ nome }}</option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
</template>