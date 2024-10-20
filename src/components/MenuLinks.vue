<template>
  <q-item to="/" tag="a" clickable>
    <q-item-section avatar>
      <q-icon name="home" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ store.lang.mainPage }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-item to="/auth" tag="a" clickable v-if="!authStore.user.email">
    <q-item-section avatar>
      <q-icon name="login" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ store.lang.loginRegistration }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-item to="/logout" tag="a" clickable v-else>
    <q-item-section avatar>
      <q-icon name="logout" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ store.lang.logout }}</q-item-label>
      <q-item-label caption>{{ authStore.user.email }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-item href="https://github.com/fak1r/crypt-text" tag="a" clickable>
    <q-item-section avatar>
      <q-icon name="code" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Github</q-item-label>
      <q-item-label caption>https://github.com/fak1r/crypt-text</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useSymbolsStore } from 'src/stores/symbolsStore'
import { useAuthStore } from 'src/stores/authStore'

const store = useSymbolsStore()
const authStore = useAuthStore()
</script>
