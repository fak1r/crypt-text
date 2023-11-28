<template>
  <q-select
    v-model="selectorKeyOptions"
    :options="store.lang.langSelectorKeys"
    class="q-pb-md"
    color="#67568c"
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
      selectorKeyOptions.value = 'Русский';
      store.currentKeyboard = 'russianKeyboard';
    } else {
      selectorKeyOptions.value = 'English';
    }
  })

  // Изменение раскладки в Конструкторе ключей
  watch(selectorKeyOptions, (newLayout) => {
    if (newLayout === 'English' || newLayout === 'Английский'){
      store.currentKeyboard = 'englishKeyboard';
    } else if (newLayout === 'Russian' || newLayout === 'Русский'){
      store.currentKeyboard = 'russianKeyboard';
    }
  })

  // Перевод раскладкок вместе с переводом сайта
  store.$subscribe(() => {   
    if (store.lang.lang === 'Русский'){
      if (selectorKeyOptions.value === 'English') selectorKeyOptions.value = 'Английский'
      if (selectorKeyOptions.value === 'Russian') selectorKeyOptions.value = 'Русский'
    } else {
      if (selectorKeyOptions.value === 'Английский') selectorKeyOptions.value = 'English'
      if (selectorKeyOptions.value === 'Русский') selectorKeyOptions.value = 'Russian'
    }
  }, { detached: true })

</script>