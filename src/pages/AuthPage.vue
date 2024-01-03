<template>
<div class="parent-container">
  <div class="child-container">
    <q-tabs
      v-model="tab"
      class="text-deep-purple-7 text-bold"
      indicator-color="purple"
    >
      <q-tab class="tab" name="login" icon="login">{{ store.lang.login }}</q-tab>
      <q-tab class="tab" name="regis" icon="app_registration">{{ store.lang.registration }}</q-tab>
    </q-tabs>

    <q-tab-panels class="tabs q-mt-md" v-model="tab" animated>
      <q-tab-panel name="login">
        <login-register :tab="tab"></login-register>
      </q-tab-panel>

      <q-tab-panel name="regis">
        <login-register :tab="tab"></login-register>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</div>
</template>

<script setup>

  import { useSymbolsStore } from 'src/stores/symbolsStore';
  import LoginRegister from 'src/components/Auth/LoginRegister.vue';
  import { ref } from 'vue';

  const store = useSymbolsStore();
  const tab = ref('login');

</script>

<style lang="sass">
.tabs
  background-color: $primary-light
  border-radius: 10px
.tab
  width: 50%
</style>