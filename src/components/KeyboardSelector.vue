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
  import { ref, onBeforeMount, watch } from 'vue'
  import { useSymbolsStore } from 'src/stores/symbolsStore';

  const store = useSymbolsStore();

  // Выбор раскладки при первом входе

  const selectorKeyOptions = ref('');

  onBeforeMount(() => {
    if (store.lang.lang === 'Русский'){
      selectorKeyOptions.value = '(RUS) Public'; 
      store.currentKeyboardId = 2;
    } else {
      selectorKeyOptions.value = '(ENG) Public';
      store.currentKeyboardId = 1;
    }
  })

  // Изменение в Конструкторе ключей

  watch(selectorKeyOptions, (newKey) => {
    if (newKey !== ''){
      store.currentKeyboardId = store.getKeyboardByName(newKey).id;
    }
  })

  // Изменение селектора при создании нового ключа
  
  store.$subscribe(() => {   
    const newKeyId = store.currentKeyboardId;
    if (newKeyId !== null) {
      const newKeyName = store.keyboards.find(key => key.id === newKeyId).name;
      selectorKeyOptions.value = newKeyName;
    } else {
      selectorKeyOptions.value = '';
    }

  }, { detached: true })

</script>

<style lang="sass">
.q-field--standout.q-field--highlighted .q-field__native
  color: #c71585
</style>