<template>
  <q-card class="key-outer text-white">
    <q-card-section>
      <div class="text-h6 text-center">Keyboards:</div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical v-for="keyboard in store.keyboards">
      <q-btn flat>{{ keyboard.name }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>

  import { useSymbolsStore } from 'src/stores/symbolsStore';

  const store = useSymbolsStore();


</script>

<style lang="sass">
.key-outer
  background: radial-gradient(circle, #67568c 0%, #dcd9e1 100%)
  cursor: pointer
.key-inner
  background-color: #1D1D1D
</style>