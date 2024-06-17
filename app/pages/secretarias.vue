<script setup lang="ts">
const items = ref<{cnpj: string, nome: string, regiao: string, estado: string, cidade: string}[]>([]);
initializeWebSocket('/secretarias').on('hello', message => items.value.push(message));
</script>

<template>
    <div>
        <h2>Secretarias</h2>
        <table>
            <tr>
                <th>CNPJ</th>
                <th>Nome</th>
                <th>Estado</th>
                <th>Cidade</th>
            </tr>
            <tr v-for="item in items" :key="item.cnpj">
                <td>{{ item.cnpj }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ item.estado }}</td>
                <td>{{ item.cidade }}</td>
            </tr>
        </table>
    </div>
</template>