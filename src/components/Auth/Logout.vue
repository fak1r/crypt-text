<template>

</template>

<script setup>

  import { useAuthStore } from 'src/stores/authStore';
  import { useRouter } from 'vue-router'

  const authStore = useAuthStore();
  const router = useRouter();

  authStore.logoutUser();
  router.push('/auth');
  
</script>