<template>
  <div class="parent-container q-pt-md">
    <div class="child-container">
      <div class="h1 text-center q-pb-md">{{ store.lang.cryptTitle }}</div>
      <div class="q-pb-md">{{ store.lang.cryptText }}</div>
      <div class="crypt-decrypt" ref="cryptedRef">
        <div class="encrypt">
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

          <div class="q-py-md flex ">
            <div class="q-pb-md">
              <q-btn
                @click="cryptPass"
                class="btn-crypt"
                :disabled="!textToCrypt"
                no-caps
              >{{ store.lang.btnCrypt }}
              </q-btn>
            
              <div class="crypt-copy-tooltip">
                <q-tooltip
                  class="crypt-copy-tooltip-component "
                  v-model="showCryptTooltip"
                  :offset="[10, 45]"
                  anchor="top middle"
                  self="bottom middle"
                >{{ store.lang.copyTooltip }}
                </q-tooltip>
              </div>
            </div>
            <span class="q-pr-md"></span>
            <div class="q-pb-md q-pr-md">
              <q-btn
                @click="textToCrypt = '', cryptedText = ''"
                class="btn-crypt"
                :disabled="!textToCrypt"
                no-caps
              >{{ store.lang.btnClear }}
              </q-btn>
            </div>
            <div>
              <q-btn
                class="btn-crypt"
                :disabled="!cryptedText"
                @click="showCryptResult = true"
                no-caps
              >{{ store.lang.btnShowResult }}
              </q-btn>
              <q-dialog v-model="showCryptResult">
                <q-card class="secret-answer">
                  <q-card-section>
                    <div class="text-h6">{{ store.lang.popupCryptTitle }}</div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section style="max-height: 50vh" class="scroll">
                    <p class="h2">{{ cryptedText }}</p>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions align="right">
                    <q-btn flat label="Ok" color="primary" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
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
          <div class="q-py-md flex">
            <div class="q-pr-md q-pb-md">
              <q-btn
              @click="decryptPass"
              class="btn-crypt"
              :disabled="!textToDecrypt"
              no-caps
              >{{ store.lang.btnDecrypt }}
              </q-btn>
            </div>
            <div class="q-pb-md q-pr-md">
              <q-btn
                @click="textToDecrypt = '', decryptedText = ''"
                class="btn-crypt"
                :disabled="!textToDecrypt"
                no-caps
              >{{ store.lang.btnClear }}
              </q-btn>
            </div>
            <div class="q-pb-md q-pr-md">
              <q-btn
                class="btn-crypt"
                :disabled="!decryptedText"
                @click="showDecryptResult = true"
                no-caps
              >{{ store.lang.btnShowResult }}
              </q-btn>
              <q-dialog v-model="showDecryptResult">
                <q-card class="secret-answer">
                  <q-card-section>
                    <div class="text-h6">{{ store.lang.popupDecryptTitle }}</div>
                  </q-card-section>

                  <q-separator />

                  <q-card-section style="max-height: 50vh" class="scroll">
                    <p class="h2">{{ decryptedText }}</p>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions align="right">
                    <div>
                      <q-btn
                        @click="copyDecrypted"
                        flat
                        no-caps
                      >{{ store.lang.btnCopy }}
                      </q-btn>
                      <div class="decrypt-copy-tooltip">
                        <q-tooltip
                          v-model="showDecryptTooltip"
                          :offset="[0, 45]"
                          anchor="top middle"
                          self="bottom middle"
                        >{{ store.lang.copyTooltip }}
                        </q-tooltip>
                      </div>
                    </div>
                    <q-btn flat label="Ok" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
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
  import { useClipboard, useFocusWithin } from '@vueuse/core';

  const store = useSymbolsStore();

  let textToCrypt = ref('');
  let textToDecrypt = ref('');
  let cryptedText = ref('');
  let decryptedText = ref('');
  const cryptedRef = ref(null);
  const showCryptResult = ref(false);
  const showDecryptResult = ref(false);

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

  // шифрование 

  const cryptPass = () => {
    const password =  textToCrypt.value;
    const passArray = password.split('');
    const cryptArray = [];
    passArray.forEach(el => cryptArray.push(encryptKeyboard.value[el]));
    cryptedText.value = cryptArray.join('');
    currentTooltip.value = 'Crypt';
    copy(cryptedText.value);
    setTimeout(() => {
      currentTooltip.value = '';
    }, 1000)
  }

  // вызов tooltip copied!
  const currentTooltip = ref('');
  const showCryptTooltip = ref(false);
  const showDecryptTooltip = ref(false);

  watch(copied, copiedUpdate => {
    if (copiedUpdate && currentTooltip.value === 'Crypt'){
      showCryptTooltip.value = true;
    } else {
      showCryptTooltip.value = false;
    }
    if (copiedUpdate && currentTooltip.value === 'Decrypt'){
      showDecryptTooltip.value = true;
    } else {
      showDecryptTooltip.value = false;
    }
  })

  // дешифровка

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

  const copyDecrypted = () => {
    currentTooltip.value = 'Decrypt';
    copy(decryptedText.value);
    setTimeout(() => {
      currentTooltip.value = '';
    }, 1000)
  }  

</script>

<style lang="sass">
@media (max-width: 365px)
  .q-pr-md
    padding-right: 10px

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
  height: 40px
  padding: 5px 10px
  background-color: #ff8e3c 
  color: #0d0d0d 
  font-weight: bold
  font-size: 1em
  border: none
  border-radius: 4px
  padding: 10px 20px
  cursor: pointer
  transition: background-color 0.3s ease 
  @media (max-width: 360px)
    padding: 4px 8px
.btn-crypt:hover 
  background-color: #d9376e 
.btn-crypt:active 
  background-color: #d71b1b 
.btn-crypt:disabled 
  background-color: #ccc 
  cursor: not-allowed
.crypt-copy-tooltip-component
  background-color: #f3bd96
  color: black
.show-result
  background-color: #babdc8
  color: black
.secret-answer
  background-color: #babdc8
</style>