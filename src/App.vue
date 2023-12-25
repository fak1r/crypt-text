<template>
  <router-view />
</template>

<script setup>

  import { defineComponent } from 'vue'
  import { useSymbolsStore } from 'src/stores/symbolsStore'

  const store = useSymbolsStore();
  store.getKeys();

  defineComponent({
    name: 'App'
  })
  
</script>
