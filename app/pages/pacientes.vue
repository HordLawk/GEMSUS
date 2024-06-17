<script setup lang="ts">
const items = ref<{cpf: string, nome: string, regiao: string, convenio: string, posto: string}[]>([]);
const newPaciente = ref({
    cpf: '',
    nome: '',
    secretaria_id: '',
    convenio: '',
    posto: '',
    senha: '',
});
const regioes = ref<{[key: string]: string}>({});
const pacientesSocket = initializeWebSocket('/pacientes');
pacientesSocket.on('read', message => items.value.push(message));
initializeWebSocket('/secretarias').on('read', message => regioes.value[message.id] = message.nome);
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
        <h3>Adicionar Paciente</h3>
        <form @submit.prevent="pacientesSocket.emit('write', newPaciente)">
            <label for="cpf">CPF</label>
            <input id="cpf" v-model="newPaciente.cpf" pattern="\d{11}" required />
            <label for="senha">Senha</label>
            <input type="password" id="senha" v-model="newPaciente.senha" required />
            <label for="nome">Nome</label>
            <input id="nome" v-model="newPaciente.nome" maxlength="64" required />
            <label for="secretaria_id">Região</label>
            <select id="secretaria_id" v-model="newPaciente.secretaria_id" required>
                <option v-for="(nome, id) in regioes" :key="id" :value="id">{{ nome }}</option>
            </select>
            <label for="convenio">Convenio</label>
            <input id="convenio" v-model="newPaciente.convenio" maxlength="64" />
            <label for="posto">Posto</label>
            <input id="posto" v-model="newPaciente.posto" maxlength="64" required />
            <button type="submit">Adicionar</button>
        </form>
    </div>
</template>