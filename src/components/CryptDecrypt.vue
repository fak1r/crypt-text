<template>
  <div class="parent-container q-pt-md">
    <div class="child-container">
      <div class="h1 text-center q-pb-md">{{ store.lang.cryptTitle }}</div>
      <div class="q-pb-md">{{ store.lang.cryptText }}</div>
      <div class="q-mb-md">
        <q-radio keep-color v-model="currentAction" val="crypt" color="orange">
          {{ store.lang.btnCrypt }}
        </q-radio>
        <q-radio keep-color v-model="currentAction" val="decrypt" color="purple">
          {{ store.lang.btnDecrypt }}
        </q-radio>
      </div>
      <div class="crypt-decrypt" ref="cryptedRef">
        <div class="encrypt" v-if="currentAction === 'crypt'">
          <input-text
            v-model="textToCrypt"
            :label="store.lang.labelCrypt"
            :eye-icon="true"
            @enter-pressed="cryptText"
          >
            <template #buttons>
              <div class="q-pb-md q-pr-md">
                <q-btn
                  @click="cryptText"
                  class="btn"
                  :disabled="!textToCrypt"
                  no-caps
                >{{ store.lang.btnCrypt }}
                </q-btn>
              </div>
              <div class="q-pr-md q-pb-md">
                <q-btn
                  class="btn"
                  :disabled="!cryptedText"
                  @click="showCryptResult = true"
                  no-caps
                >{{ store.lang.btnShowResult }}
                </q-btn>
              </div>
            </template>
          </input-text>

          <modal-dialog
            v-model="showCryptResult"
            :title="store.lang.popupCryptTitle"
            :text="cryptedText"
            :tooltip="'Crypt'"
            @clearText="cryptedText = ''"
          ></modal-dialog> 
        </div>

        <div class="decrypt" v-else>
          <input-text
            v-model="textToDecrypt"
            :label="store.lang.labelDecrypt"
            :eye-icon="true"
            @enter-pressed="decryptText"
          >
            <template #buttons>
              <div class="q-pr-md q-pb-md">
              <q-btn
              @click="decryptText"
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
            </div>
            </template>
          </input-text>

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
</template>

<script setup>

  import { ref, watch } from 'vue';
  import { useSymbolsStore } from 'src/stores/symbolsStore';
  import { useFocusWithin } from '@vueuse/core';
  import ModalDialog from './ModalDialog.vue';
  import InputText from './InputText.vue';

  const store = useSymbolsStore();

  let textToCrypt = ref('');
  let textToDecrypt = ref('');
  let cryptedText = ref('');
  let decryptedText = ref('');
  const showCryptResult = ref(false);
  const showDecryptResult = ref(false);
  const currentAction = ref('crypt');

  const encryptKeyboard = ref(store.getCurrentKey);

  // Обновление данных при изменении в state Pinia

  store.$subscribe(() => {   
    encryptKeyboard.value = store.getCurrentKey;
  }, { detached: true })

  // Шифрование 

  const cryptText = () => {
    const text = textToCrypt.value;
    const textArray = text.split('');
    const cryptArray = [];
    textArray.forEach(el => cryptArray.push(encryptKeyboard.value[el]));
    cryptedText.value = cryptArray.join('');
    showCryptResult.value = true;
  }

  // Дешифровка

  const decryptText = () => {
    const decryptArray = textToDecrypt.value.split('');
    const result = [];
    for (let i = 0; i <= decryptArray.length; i++){
      Object.keys(encryptKeyboard.value).find(key => {
        if (encryptKeyboard.value[key] === decryptArray[i]){
          result.push(key)
        }
      });
    }
    decryptedText.value = result.join('');
    showDecryptResult.value = true;
  }

  // Проверка фокуса на инпуте
  
  const cryptedRef = ref(null);
  const { focused } = useFocusWithin(cryptedRef);

  watch(focused, focused => {
    if (focused){
      store.onInputFlag = true;
    } else {
      store.onInputFlag = false;
    }
  });
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
  @media (hover: none) and (pointer: coarse)
    &:hover
      color: #8a8a8a
  &:active
    color: #8a8a8a
</style>