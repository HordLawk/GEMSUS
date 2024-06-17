<script setup lang="ts">
const items = ref<{cpf: string, nome: string, local: string}[]>([]);
const newFarmaceutico = ref({
    cpf: '',
    senha: '',
    nome: '',
    local: '',
});
const farmaceuticosSocket = initializeWebSocket('/farmaceuticos');
farmaceuticosSocket.on('read', message => items.value.push(message));
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
                <td>{{ item.nome }}</td>
                <td>{{ item.local }}</td>
            </tr>
        </table>
        <h3>Adicionar Farmaceutico</h3>
        <form @submit.prevent="farmaceuticosSocket.emit('write', newFarmaceutico)">
            <label for="cpf">CPF</label>
            <input id="cpf" pattern="\d{11}" v-model="newFarmaceutico.cpf" required />
            <label for="senha">Senha</label>
            <input id="senha" type="password" v-model="newFarmaceutico.senha" required />
            <label for="nome">Nome</label>
            <input id="nome" v-model="newFarmaceutico.nome" maxlength="64" required />
            <label for="local">Local</label>
            <input id="local" v-model="newFarmaceutico.local" maxlength="64" required />
            <button type="submit">Adicionar</button>
        </form>
    </div>
</template>