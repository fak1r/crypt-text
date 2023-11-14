<template>
  <q-layout class="q-pl-md" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Crypt Text
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="aside"
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <Keyboard-symbols></Keyboard-symbols>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  
  import { ref } from 'vue'
  import KeyboardSymbols from '../components/KeyboardSymbols.vue';

  const leftDrawerOpen = ref(false);

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

</script>

<style lang="sass">
.aside
  background-color: #dcd9e1

</style>
