<script setup lang="ts">
const items = ref<{cpf: string, nome: string, regiao: string, convenio: string, posto: string}[]>([]);
const regioes = ref<{[key: string]: string}>({});
initializeWebSocket('/pacientes').on('read', message => items.value.push(message));
initializeWebSocket('/secretarias').on('read', message => regioes.value[message.cnpj] = message.nome);
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
                <td>{{ item.nome }}</td>
                <td>{{ regioes[item.regiao] }}</td>
                <td>{{ item.convenio }}</td>
                <td>{{ item.posto }}</td>
            </tr>
        </table>
    </div>
</template>