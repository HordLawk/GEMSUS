<script setup lang="ts">
const items = ref<{cpf: string, nome: string, local: string}[]>([]);
initializeWebSocket('/farmaceuticos').on('read', message => items.value.push(message));
</script>

<template>
    <div>
        <h2>Farmaceuticos</h2>
        <table>
            <tr>
                <th>CPF</th>
                <th>Nome</th>
                <th>Local</th>
            </tr>
            <tr v-for="item in items" :key="item.cpf">
                <td>{{ item.cpf }}</td>
                <td>
                    <input type="text" v-model="item.nome">
                </td>
                <td>
                    <input type="text" v-model="item.local">
                </td>
            </tr>
        </table>
    </div>
</template>