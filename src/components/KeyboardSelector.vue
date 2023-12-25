<template>
  <q-select
    v-model="selectorKeyOptions"
    :options="store.getKeyboardNames"
    class="q-pb-md"
    popup-content-class="bg-deep-purple-1"
    standout
    label-color="pink-10"
    bg-color="deep-purple-2"
    :label="store.lang.langSelectorLable"
  />
</template>

<script setup>

  import { ref, watch, onMounted } from 'vue'
  import { useSymbolsStore } from 'src/stores/symbolsStore';

  const store = useSymbolsStore();

  const selectorKeyOptions = ref('');

  // Изменение ключа по селектору

  watch(selectorKeyOptions, (newKey) => {
    if (newKey !== ''){
      store.currentKeyboardId = store.getKeyboardByName(newKey).id;
    }
  })

  // Выбор ключа при первом входе

  onMounted(() => {
    if (!selectorKeyOptions.value && store.keyboards.length !== 0){
      selectorKeyOptions.value = store.keyboards.find(el => el).name;
    }
  });

  // Изменение селектора при создании нового ключа

  store.$subscribe(() => {   
    const newKeyId = store.currentKeyboardId;
    if (newKeyId !== null){
      const newKeyName = store.keyboards.find(key => key.id === newKeyId).name;
      selectorKeyOptions.value = newKeyName;
    } else {
      selectorKeyOptions.value = '';
    }
  }, { detached: true });

</script>

<style lang="sass">
.q-field--standout.q-field--highlighted .q-field__native
  color: #c71585
</style>