<template>
  <div id="app">
    <button @click="toggleComponent('farmaceutico')">Mostrar Farmaceutico</button>
    <button @click="toggleComponent('secretaria')">Mostrar Secretaria</button>
    <button @click="toggleComponent('medicamento')">Mostrar Medicamento</button>
    <button @click="toggleComponent('estoqueRegional')">Mostrar Estoque Regional</button>
    <button @click="toggleComponent('estoqueLocal')">Mostrar Estoque Local</button>
    <button @click="toggleComponent('paciente')">Mostrar Paciente</button>
    <button @click="toggleComponent('medico')">Mostrar Medico</button>
    <button @click="toggleComponent('receita')">Mostrar Receita</button>

    <Farmaceutico v-if="currentComponent === 'farmaceutico'"/>
    <Secretaria v-if="currentComponent === 'secretaria'"/>
    <Medicamento v-if="currentComponent === 'medicamento'"/>
    <EstoqueRegional v-if="currentComponent === 'estoqueRegional'"/>
    <EstoqueLocal v-if="currentComponent === 'estoqueLocal'"/>
    <Paciente v-if="currentComponent === 'paciente'"/>
    <Medico v-if="currentComponent === 'medico'"/>
    <Receita v-if="currentComponent === 'receita'"/>
  </div>
</template>

<script>
import Farmaceutico from './src/components/Farmaceutico.vue';
import Secretaria from './src/components/Secretaria.vue';
import Medicamento from './src/components/Medicamento.vue';
import EstoqueRegional from './src/components/EstoqueRegional.vue';
import EstoqueLocal from './src/components/EstoqueLocal.vue';
import Paciente from './src/components/Paciente.vue';
import Medico from './src/components/Medico.vue';
import Receita from './src/components/Receita.vue';

export default {
  components: {
    Farmaceutico,
    Secretaria,
    Medicamento,
    EstoqueRegional,
    EstoqueLocal,
    Paciente,
    Medico,
    Receita,
  },
  data() {
    return {
      currentComponent: null,
    };
  },
  methods: {
    toggleComponent(component) {
      this.currentComponent = this.currentComponent === component ? null : component;
    },
  },
};
</script>