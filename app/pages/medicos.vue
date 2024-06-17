<script setup lang="ts">
const items = ref<{crm: string, nome: string, regiao: string}[]>([]);
const regioes = ref<{cnpj: string, nome: string}[]>([]);
initializeWebSocket('/medicos').on('read', message => items.value.push(message));
initializeWebSocket('/secretarias').on('read', message => regioes.value.push(message));
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
                <td>
                    <input type="text" v-model="item.nome">
                </td>
                <td>
                    <select v-model="item.regiao" required>
                        <option value=""></option>
                        <option v-for="{cnpj, nome} in regioes" :key="cnpj" :value="cnpj">{{ nome }}</option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
</template>