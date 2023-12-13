<template>
  <div class="parent-container q-pt-md">
    <div class="child-container">
      <div class="h1 text-center q-pb-md">{{ store.lang.cryptTitle }}</div>
      <div class="q-pb-md">{{ store.lang.cryptText }}</div>
      <keyboard-selector></keyboard-selector>
      <div class="crypt-decrypt" ref="cryptedRef">
        <div class="encrypt">
          <q-input
            v-model="textToCrypt"
            color="teal"
            :placeholder="store.lang.placeholderCrypt"
            outlined
            :type="cryptInputType"
          >
            <template v-slot:append>
              <q-icon class="input-icon" v-if="textToCrypt" name="close" @click="textToCrypt = ''" />
              <q-icon class="input-icon" v-if="cryptInputType === 'text'" @click="cryptInputType = 'password'" name="visibility"></q-icon>
              <q-icon class="input-icon" v-if="cryptInputType === 'password'" @click="cryptInputType = 'text'" name="visibility_off"></q-icon>
            </template>
          </q-input>
          <div class="q-py-md flex ">
            <div class="q-pb-md">
              <q-btn
                @click="cryptPass"
                class="btn"
                :disabled="!textToCrypt"
                no-caps
              >{{ store.lang.btnCrypt }}
              </q-btn>
            </div>
            <span class="q-pr-md"></span>
            <div>
              <q-btn
                class="btn"
                :disabled="!cryptedText"
                @click="showCryptResult = true"
                no-caps
              >{{ store.lang.btnShowResult }}
              </q-btn>
              <modal-dialog
                v-model="showCryptResult"
                :title="store.lang.popupCryptTitle"
                :text="cryptedText"
                :tooltip="'Crypt'"
                @clearText="cryptedText = ''"
              ></modal-dialog>
            </div>
          </div>    
        </div>

        <div class="decrypt">
          <q-input
            v-model="textToDecrypt"
            color="teal"
            :placeholder="store.lang.placeholderDecrypt"
            outlined
            type="text"
          >
            <template v-slot:append>
              <q-icon v-if="textToDecrypt" name="close" @click="textToDecrypt = ''" class="cursor-pointer" />
            </template>
          </q-input>
          <div class="q-py-md flex">
            <div class="q-pr-md q-pb-md">
              <q-btn
              @click="decryptPass"
              class="btn"
              :disabled="!textToDecrypt"
              no-caps
              >{{ store.lang.btnDecrypt }}
              </q-btn>
            </div>
            <div class="q-pr-md q-pb-md">
              <q-btn
                class="btn"
                :disabled="!decryptedText"
                @click="showDecryptResult = true"
                no-caps
              >{{ store.lang.btnShowResult }}
              </q-btn>
              <modal-dialog
                v-model="showDecryptResult"
                :title="store.lang.popupDecryptTitle"
                :text="decryptedText"
                @clear-text="decryptedText = ''"
              ></modal-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { ref, watch } from 'vue';
  import { useSymbolsStore } from 'src/stores/symbolsStore';
  import { useFocusWithin } from '@vueuse/core';
  import KeyboardSelector from './KeyboardSelector.vue';
  import ModalDialog from './ModalDialog.vue';

  const store = useSymbolsStore();

  let textToCrypt = ref('');
  let textToDecrypt = ref('');
  let cryptedText = ref('');
  let decryptedText = ref('');
  const showCryptResult = ref(false);
  const showDecryptResult = ref(false);
  const cryptInputType = ref('text');

  const encryptKeyboard = ref(store.getKeyboardById(store.currentKeyboardId));

  // Обновление данных при изменении в state Pinia
  
  store.$subscribe(() => {   
    encryptKeyboard.value = store.getKeyboardById(store.currentKeyboardId);
  }, { detached: true })

  // Проверка фокуса, для отключение отслеживания нажатий в Builder

  const cryptedRef = ref(null);

  const { focused } = useFocusWithin(cryptedRef);

  watch(focused, focused => {
    if (focused) {
      store.onInput(true);
    } else {
      store.onInput(false);
    }
  })

  // Шифрование 

  const cryptPass = () => {
    const password =  textToCrypt.value;
    const passArray = password.split('');
    const cryptArray = [];
    passArray.forEach(el => cryptArray.push(encryptKeyboard.value[el]));
    cryptedText.value = cryptArray.join('');
    showCryptResult.value = true;
  }

  // Дешифровка

  const decryptPass = () => {
    const decryptArr = textToDecrypt.value.split('');
    const result = [];
    for (let i = 0; i <= decryptArr.length; i++){
      Object.keys(encryptKeyboard.value).find(key => {
        if (encryptKeyboard.value[key] === decryptArr[i]){
          result.push(key)
        }
      });
    }
    decryptedText.value = result.join('');
    showDecryptResult.value = true;
  }
</script>

<style lang="sass">
@media (max-width: 365px)
  .q-pr-md
    padding-right: 10px
  .q-pb-md
    padding-bottom: 10px
.input-pass 
  display: flex
  align-items: center
  width: 300px
  border: 1px solid #ccc
  border-radius: 4px
  padding: 10px
  margin-bottom: 10px
.input-pass input 
  flex: 1
  border: none
  padding: 5px
  outline: none
.input-icon
  cursor: pointer
  @media (hover: hover) 
    &:hover
      color: #adadad
  &:active
    color: #adadad
</style>