<template>
  <div style="max-width: 200px">
    <q-scroll-area
      style="height: 600px; width: 170px;"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      class="scroll"
      @mouseover="copyBtn.classList.add('visible');"
      @mouseleave="copyBtn.classList.remove('visible');"
    >
      <q-input
        v-model="encryptKeyboardText"
        borderless
        ref="textareaRef"
        type="textarea"
        cols="20"
        rows="10"
        autogrow
        filled
      >
      </q-input>
    </q-scroll-area>
    <div class="copy-btn" @mouseover="copyBtn.classList.add('visible');">
      <q-icon @click="copy(encryptKeyboardText)" color="blue-6" size="30px" name="content_copy"></q-icon>
      <div>
        <q-tooltip
          class="bg-blue-6"
          v-model="showTooltip"
          :offset="[0, 45]"
          anchor="top middle"
          self="bottom middle"
        >{{ store.lang.copyTooltip }}
        </q-tooltip>
      </div>
    </div>
  </div>

</template>

<script setup>

  import { ref, watch, onMounted } from 'vue';
  import { useSymbolsStore } from 'src/stores/symbolsStore';
  import { useFocusWithin, useClipboard } from '@vueuse/core';

  const store = useSymbolsStore();

  let encryptKeyboard = ref(store.getKeyboardById(store.currentKeyboardId));
  let encryptKeyboardText = ref(JSON.stringify(encryptKeyboard.value, null, 2));

  // Копирование ключа
  
  const { copy, copied } = useClipboard({ source: encryptKeyboardText });
  let copyBtn = null;
  
  onMounted(() => {
    copyBtn = document.querySelector('.copy-btn');
  })

  const showTooltip = ref(false);

  watch(copied, copiedUpdate => {
    if (copiedUpdate){
      showTooltip.value = true;
    } else {
      showTooltip.value = false;
    }
  })

  // Стили скролла

  const thumbStyle = {
    right: '4px',
    borderRadius: '5px',
    backgroundColor: '#67568c',
    width: '5px',
    opacity: 0.75
  };
  const barStyle = {
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#67568c',
    width: '9px',
    opacity: 0.2
  };

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
.copy-btn
  position: absolute
  top: 60px
  left: 22px
  cursor: pointer
  z-index: 10
  opacity: 0
  visibility: hidden
  transition: opacity .5s, visibility .5s
  @media (hover: none) 
    opacity: 1
    visibility: visible
.visible 
  opacity: 1
  visibility: visible
.q-scroll-area
  padding: 0
  text-align: center
</style>