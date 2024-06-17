<script setup lang="ts">
const items = ref<{id: string, nome: string, estado: string, cidade: string}[]>([]);
const newSecretaria = ref({
    id: '',
    senha: '',
    nome: '',
    estado: '',
    cidade: '',
});
const secretariasSocket = initializeWebSocket('/secretarias');
secretariasSocket.on('read', message => items.value.push(message));
</script>

<template>
    <div>
        <h2>Secretarias</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Estado</th>
                <th>Cidade</th>
            </tr>
            <tr v-for="item in items" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ item.estado }}</td>
                <td>{{ item.cidade }}</td>
            </tr>
        </table>
        <h3>Adicionar Secretaria</h3>
        <form @submit.prevent="secretariasSocket.emit('write', newSecretaria)">
            <label for="id">ID</label>
            <input id="id" v-model="newSecretaria.id" maxlength="64" required />
            <label for="senha">Senha</label>
            <input id="senha" type="password" v-model="newSecretaria.senha" required />
            <label for="nome">Nome</label>
            <input id="nome" v-model="newSecretaria.nome" maxlength="64" required />
            <label for="estado">Estado</label>
            <input id="estado" v-model="newSecretaria.estado" maxlength="64" required />
            <label for="cidade">Cidade</label>
            <input id="cidade" v-model="newSecretaria.cidade" maxlength="64" required />
            <button type="submit">Adicionar</button>
        </form>
    </div>
</template>