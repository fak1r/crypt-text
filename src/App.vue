<template>
  <router-view />
</template>

<script setup>

  import { defineComponent, onMounted } from 'vue'
  import { useAuthStore } from 'src/stores/authStore';

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.init();
  })

  defineComponent({
    name: 'App'
  })
  
</script>
