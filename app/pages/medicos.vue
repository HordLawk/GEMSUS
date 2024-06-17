<script setup lang="ts">
const items = ref<{crm: string, nome: string, regiao: string}[]>([]);
const newMedico = ref({
    crm: '',
    senha: '',
    nome: '',
    secretaria_id: '',
});
const regioes = ref<{[key: string]: string}>({});
const medicosSocket = initializeWebSocket('/medicos');
medicosSocket.on('read', message => items.value.push(message));
initializeWebSocket('/secretarias').on('read', message => regioes.value[message.id] = message.nome);
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
        <h3>Adicionar Medico</h3>
        <form @submit.prevent="medicosSocket.emit('write', newMedico)">
            <label for="crm">CRM</label>
            <input id="crm" v-model="newMedico.crm" pattern="\d{6}(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)" required />
            <label for="senha">Senha</label>
            <input type="password" id="senha" v-model="newMedico.senha" required />
            <label for="nome">Nome</label>
            <input id="nome" v-model="newMedico.nome" maxlength="64" required />
            <label for="secretaria_id">Região</label>
            <select id="secretaria_id" v-model="newMedico.secretaria_id" required>
                <option v-for="(nome, id) in regioes" :key="id" :value="id">{{ nome }}</option>
            </select>
            <button type="submit">Adicionar</button>
        </form>
    </div>
</template>