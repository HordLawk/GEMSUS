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
                <th>Regiao</th>
                <th>Estado</th>
                <th>Cidade</th>
            </tr>
            <tr v-for="item in items" :key="item.cnpj">
                <td>{{ item.cnpj }}</td>
                <td>
                    <input type="text" v-model="item.nome">
                </td>
                <td>
                    <input type="text" v-model="item.estado">
                </td>
                <td>
                    <input type="text" v-model="item.cidade">
                </td>
            </tr>
        </table>
    </div>
</template>