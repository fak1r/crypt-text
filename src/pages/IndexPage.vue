<template>
  <q-page class="flex flex-center" style="min-height: 0">
    <crypt-decrypt></crypt-decrypt>
    <keyboard-builder></keyboard-builder>
    <key-list></key-list>
  </q-page>
</template>

<script setup>

  import KeyboardBuilder from 'src/components/KeyboardBuilder.vue';
  import KeyList from 'src/components/KeyList.vue';
  import CryptDecrypt from 'src/components/CryptDecrypt.vue';

  import { defineComponent } from 'vue'

  defineComponent({
    name: 'IndexPage'
  })

</script>

<style lang="sass">
</style>