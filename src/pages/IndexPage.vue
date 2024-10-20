<template>
  <q-page class="flex flex-center" style="min-height: 0">
    <key-list v-if="authStore.user.email" />
    <crypt-decrypt />
    <keyboard-builder />
  </q-page>
</template>

<script setup>
import KeyboardBuilder from 'src/components/KeyboardBuilder.vue'
import KeyList from 'src/components/KeyList.vue'
import CryptDecrypt from 'src/components/CryptDecrypt.vue'
import { useAuthStore } from 'src/stores/authStore'
import { defineComponent } from 'vue'

const authStore = useAuthStore()

defineComponent({
  name: 'IndexPage',
})
</script>
