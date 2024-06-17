<script setup lang="ts">
const items = ref<{cpf: string, nome: string, regiao: string, convenio: string, posto: string}[]>([]);
const regioes = ref<{cnpj: string, nome: string}[]>([]);
initializeWebSocket('/pacientes').on('read', message => items.value.push(message));
initializeWebSocket('/secretarias').on('read', message => regioes.value.push(message));
</script>

<template>
    <div>
        <h2>Pacientes</h2>
        <table>
            <tr>
                <th>CPF</th>
                <th>Nome</th>
                <th>Regiao</th>
                <th>Convenio</th>
                <th>Posto</th>
            </tr>
            <tr v-for="item in items" :key="item.cpf">
                <td>{{ item.cpf }}</td>
                <td>
                    <input type="text" v-model="item.nome">
                </td>
                <td>
                    <select v-model="item.regiao" required>
                        <option value=""></option>
                        <option v-for="{cnpj, nome} in regioes" :key="cnpj" :value="cnpj">{{ nome }}</option>
                    </select>
                </td>
                <td>
                    <input type="text" v-model="item.convenio">
                </td>
                <td>
                    <input type="text" v-model="item.posto">
                </td>
            </tr>
        </table>
    </div>
</template>