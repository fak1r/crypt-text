<template>
  <div class="q-px-md textarea" style="max-width: 200px">
    <q-input
      v-model="encryptKeyboardText"
      borderless
      ref="textareaRef"
      type="textarea"
      cols="20"
      rows="100"
    />
  </div>
</template>

<script setup>

  import { ref, watch } from 'vue';
  import { useSymbolsStore } from 'src/stores/symbolsStore'
  import { useFocusWithin } from '@vueuse/core';

  const store = useSymbolsStore();

  let encryptKeyboard = ref(store.getKeyboardById(store.currentKeyboardId));
  let encryptKeyboardText = ref(JSON.stringify(encryptKeyboard.value, null, 2));

  // Отслеживание изменений в store и обновление textarea

  store.$subscribe(() => {   
    if (store.currentKeyboardId !== null){
      encryptKeyboard.value = store.getKeyboardById(store.currentKeyboardId);
      try {
        encryptKeyboardText.value = JSON.stringify(encryptKeyboard.value, null, 2);
      } 
      catch (error) {
        console.log('KEY FORMAT ', error);
      }
    } else {
      encryptKeyboardText.value = '';
    }
  }, { detached: true })

  // Отслеживание изменений в textarea и обновление в store

  watch(encryptKeyboardText, (newText) => {
    try {
      store.updateKeyboard(JSON.parse(newText), store.currentKeyboardId);
    } 
    catch (error) {
      console.log('KEY FORMAT ', error);
    }
  });

  // Проверка фокуса

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
  text-align: center
</style>