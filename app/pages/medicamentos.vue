<script setup lang="ts">
const items = ref<{registro: string, nome: string, tarja: string}[]>([]);
const newMedicamento = ref({
    registro: '',
    nome: '',
    tarja: '',
});
const medicamentosSocket = initializeWebSocket('/medicamentos');
medicamentosSocket.on('read', message => items.value.push(message));
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
                <td>{{ item.nome }}</td>
                <td>{{ item.tarja }}</td>
            </tr>
        </table>
        <h3>Adicionar Medicamento</h3>
        <form @submit.prevent="medicamentosSocket.emit('write', newMedicamento)">
            <label for="registro">Registro</label>
            <input id="registro" v-model="newMedicamento.registro" pattern="\d{13}" required />
            <label for="nome">Nome</label>
            <input id="nome" v-model="newMedicamento.nome" maxlength="64" required />
            <label for="tarja">Tarja</label>
            <select id="tarja" v-model="newMedicamento.tarja" required>
                <option value="">Sem tarja</option>
                <option value="A">Amarela</option>
                <option value="V">Vermelha</option>
                <option value="P">Preta</option>
            </select>
            <button type="submit">Adicionar</button>
        </form>
    </div>
</template>