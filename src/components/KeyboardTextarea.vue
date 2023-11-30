<template>
  <div class="q-px-md" style="max-width: 150px">
    <q-input
      v-model="encryptKeyboardText"
      borderless
      ref="textareaRef"
      type="textarea"
      cols="0"
      rows="0"
    />
  </div>
</template>

<script setup>

  import { ref, watch } from 'vue';
  import { useSymbolsStore } from 'src/stores/symbolsStore'
  import { useFocusWithin } from '@vueuse/core';

  const store = useSymbolsStore();

  let encryptKeyboard = ref(store.getKeyboardByName(store.currentKeyboard));
  let encryptKeyboardText = ref(JSON.stringify(encryptKeyboard.value, null, 2));

  // отслеживание изменений в store и обновление textarea

  store.$subscribe(() => {   
    encryptKeyboard.value = store.getKeyboardByName(store.currentKeyboard);
    try {
      encryptKeyboardText.value = JSON.stringify(encryptKeyboard.value, null, 2);
    } 
    catch (error) {
      alert(error)
    }
  }, { detached: true })

  // отслеживание изменений в textarea и обновление в store

  watch(encryptKeyboardText, (newText) => {
    try {
      store.updateKeyboard(JSON.parse(newText), store.currentKeyboard);
    } 
    catch (error) {
      alert(error)
    }
  });

  // проверка фокуса

  const textareaRef = ref(null);
  const { focused } = useFocusWithin(textareaRef);

  watch(focused, focused => {
    if (focused) {
      store.onInput(true);
    }
    else {
      store.onInput(false);
    }
  })
</script>


<style lang="sass">
.q-textarea .q-field__native, .q-textarea .q-field__prefix, .q-textarea .q-field__suffix
  line-height: 1.5
  font-size: 24px
  padding: 0
  display: inline-table
</style>