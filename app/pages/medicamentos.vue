<script setup lang="ts">
const items = ref<{registro: string, nome: string, tarja: string}[]>([]);
initializeWebSocket('/medicamentos').on('read', message => items.value.push(message));
</script>

<template>
    <div>
        <h2>Medicamentos</h2>
        <table>
            <tr>
                <th>Registro</th>
                <th>Nome</th>
                <th>Tarja</th>
            </tr>
            <tr v-for="item in items" :key="item.registro">
                <td>{{ item.registro }}</td>
                <td>
                    <input type="text" v-model="item.nome">
                </td>
                <td>
                    <input type="text" v-model="item.tarja">
                </td>
            </tr>
        </table>
    </div>
</template>