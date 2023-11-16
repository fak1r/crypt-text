<template>
  <div class="q-pa-md" style="max-width: 200px">
    <q-input
      v-model="encryptKeyboardText"
      filled
      ref="textareaRef"
      type="textarea"
      cols="30"
      rows="50"
    />
  </div>
</template>

<script setup>

  import { ref, watch } from 'vue';
  import { useSymbolsStore } from 'src/stores/symbolsStore'
  import { useFocusWithin } from '@vueuse/core';

  const store = useSymbolsStore();

  let encryptKeyboard = ref(store.getKeyboardByName('encryptKeyboard'));
  let encryptKeyboardText = ref(JSON.stringify(encryptKeyboard.value, null, 2));

  // отслеживание изменений в store и обновление textarea

  store.$subscribe(() => {   
    encryptKeyboard.value = store.getKeyboardByName('encryptKeyboard');
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
      store.updateKeyboard(JSON.parse(newText), 'encryptKeyboard');
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
  font-size: 26px
</style>