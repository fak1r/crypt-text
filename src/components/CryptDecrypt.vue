<template>
  <div class="container q-pt-md q-pr-md">
    <div class="crypt-decrypt" ref="cryptedRef">
      <div class="encrypt">
        <div class="h1">Original: {{ textToCrypt }}</div>

        <q-input
          v-model="textToCrypt"
          color="teal"
          placeholder="text to encrypt"
          outlined
          type="text"
        >
          <template v-slot:append>
            <svg fill="#AAA" xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
          </template>
        </q-input>

        <div class="q-pt-md">
          <div class="q-gutter-sm">
            <q-btn
              @click="cryptoPass"
              class="btn-crypt"
              label="Encrypt & Copy"
              :disabled="!textToCrypt"
            />
          </div>
          <div class="copy-tooltip">
            <q-tooltip v-model="showTooltip">Copied!</q-tooltip>
          </div>
        </div>    

        <div>
          <p class="h1">Encrypted: {{ cryptedText }}</p>
        </div>
      </div>

      <div class="decrypt">
        <q-input
          v-model="textToDecrypt"
          color="teal"
          placeholder="secret code"
          outlined
          type="text"
        >
          <template v-slot:append>
            <svg fill="#AAA" xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M420-360h120l-23-129q20-10 31.5-29t11.5-42q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 23 11.5 42t31.5 29l-23 129Zm60 280q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>
          </template>
        </q-input>
        <div class="q-pt-md">
          <q-btn
            @click="decryptPass"
            class="btn-crypt"
            label="Decrypt"
            :disabled="!textToDecrypt"
          />
        </div>
        <div class="h1">Decrypted: {{ decryptedText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { ref, watch } from 'vue';
  import { useSymbolsStore } from 'src/stores/symbolsStore';
  import { useClipboard, useFocusWithin } from '@vueuse/core';

  const store = useSymbolsStore();

  let textToCrypt = ref('');
  let textToDecrypt = ref('');
  let cryptedText = ref('');
  let decryptedText = ref('');
  const cryptedRef = ref(null);
  const showTooltip = ref(false);

  const encryptKeyboard = ref(store.getKeyboardByName('encryptKeyboard'));

  // обновление данных при изменении в state Pinia
  store.$subscribe(() => {   
    encryptKeyboard.value = store.getKeyboardByName('encryptKeyboard');
  }, { detached: true })

  // функционал копирования пароля

  const { copy, copied } = useClipboard({ source: cryptedText });

  // проверка фокуса 

  const { focused } = useFocusWithin(cryptedRef);

  watch(focused, focused => {
    if (focused) {
      store.onInput(true);
    }
    else {
      store.onInput(false);
    }
  })

  // шифрование и дешифровка пароля

  const cryptoPass = () => {
    const password =  textToCrypt.value;
    const passArray = password.split('');
    const cryptArray = [];
    passArray.forEach(el => cryptArray.push(encryptKeyboard.value[el]));
    cryptedText.value = cryptArray.join('');
    copy(cryptedText.value);
  }

  watch(copied, copiedUpdate => {
    if (copiedUpdate){
      showTooltip.value = true;
    } else {
      showTooltip.value = false;
    }
  })

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
  }

</script>

<style lang="sass">
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
.btn-crypt 
  background-color: #ff8e3c 
  color: #0d0d0d 
  font-weight: bold
  font-size: 1em
  border: none
  border-radius: 4px
  padding: 10px 20px
  cursor: pointer
  transition: background-color 0.3s ease 
.btn-crypt:hover 
  background-color: #d9376e 
.btn-crypt:active 
  background-color: #d71b1b 
.btn-crypt:disabled 
  background-color: #ccc 
  cursor: not-allowed
.copy-tooltip
  width: 150px
.q-tooltip
  background-color: #67568c
</style>