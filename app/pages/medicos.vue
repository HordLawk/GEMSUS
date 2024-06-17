<script setup lang="ts">
const items = ref<{crm: string, nome: string, regiao: string}[]>([]);
const regioes = ref<{[key: string]: string}>({});
initializeWebSocket('/medicos').on('read', message => items.value.push(message));
initializeWebSocket('/secretarias').on('read', message => regioes.value[message.cnpj] = message.nome);
</script>

<template>
    <div>
        <h2>Medicos</h2>
        <table>
            <tr>
                <th>CRM</th>
                <th>Nome</th>
                <th>Regiao</th>
            </tr>
            <tr v-for="item in items" :key="item.crm">
                <td>{{ item.crm }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ regioes[item.regiao] }}</td>
            </tr>
        </table>
    </div>
</template>