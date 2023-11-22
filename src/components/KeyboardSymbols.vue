<template>
  <div class="keyboard flex-column justify-center">
    <table class="keyboard-table">
      <tr>
        <td colspan="26">
          <div class="h1 text-center">{{ store.lang.builderTitle }}</div>
        </td>
      </tr>
      <tr>
        <td colspan="26">
          <div class="q-py-md">
            {{ store.lang.builderText }}
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="26">
          <div class="h2">{{ store.lang.builderKeyboard }}</div>
        </td>
      </tr>
      <tr v-for="(cryptRow, index) in keyboardRows" :key="index" ref="keyboard">
        <td
          v-for="(cryptChar, key) in cryptRow"
          :key="key"
          @click="chooseSymbolsToChange(cryptChar, encryptKeyboard)"
          :class="{ yellow: symbolToRemove === cryptChar, pink: symbolToRemove !== cryptChar }"
        >
          <div class="h2">{{ key }}:</div>
          <div class="h2">{{ cryptChar }}</div>
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <div class="h2">{{ store.lang.builderSymbols }}</div>
        </td>
        <td colspan="21">
          <div class="alert">
            <div class="h2 repeated" v-if="repeatedSymbol">
              {{ store.lang.builderChooseWarning }}
            </div>
            <div class="h2 newRemove" v-if="symbolToRemove && !repeatedSymbol">
              {{ store.lang.builderChooseNewSymbol }}
            </div>
            <div class="h2 newAdd" v-if="symbolToAdd && !repeatedSymbol">
              {{ store.lang.builderChooseOldSymbol }}
            </div>
          </div>
        </td>
      </tr>
      <tr v-for="(symbolsRow, index) in symbolsRows" :key="index">
        <td
          v-for="(symbol, key) in symbolsRow"
          :key="key"
          @click="chooseSymbolsToChange(symbol, encryptKeyboard, true)"
          :class="{ yellow: symbolToAdd === symbol, blue: symbolToAdd !== symbol }"
        >
          <div class="h2">{{ symbol }}</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>

  import { ref, computed } from 'vue';
  import { useSymbolsStore } from 'src/stores/symbolsStore'

  const store = useSymbolsStore();

  const encryptKeyboard = ref(store.getKeyboardByName('encryptKeyboard'));

  // обновление данных при изменении в state Pinia
  store.$subscribe(() => {   
    encryptKeyboard.value = store.getKeyboardByName('encryptKeyboard');
  }, { detached: true })

  const symbols = ref(store.getKeyboardByName('symbols'));

  // замена символов по клику
  let symbolToRemove = ref('');
  let symbolToAdd = ref('');
  let repeatedSymbol = ref('');
  let clickOnChar = false;
  let clickOnSymbol = false;
  let oldKey = '';

  const keyByValue = (symbol, keyboard) => {
    return Object.keys(keyboard).find(key => keyboard[key] === symbol);
  }

  const chooseSymbolsToChange = (symbol, keyboard, clickOnSymbols = false) => {
    repeatedSymbol.value = false;
    const key = keyByValue(symbol, keyboard);

    // если кликнули на клавиатуру
    if (key){
      if (key === oldKey || oldKey === '') clickOnChar = !clickOnChar;
      if (key != oldKey && clickOnChar === false) clickOnChar = true;
      oldKey = key;
      symbolToRemove.value = symbol;
      if (!clickOnChar) symbolToRemove.value = '';
    } 
    else {
      if (symbol === symbols.value[symbolToAdd.value]) {
        clickOnSymbol = !clickOnSymbol;
      } 
      else clickOnSymbol = true;
      oldKey = key;
      symbolToAdd.value = symbol;
      if (!clickOnSymbol) symbolToAdd.value = '';    
    }

    // проверка на наличие повторов
    if (clickOnSymbols && Object.values(keyboard).find(el => el === symbol) && 
    Object.values(symbols.value).find(el => el === symbol)){
      if (!clickOnChar || !clickOnSymbol) repeatedSymbol.value = false;
      if (clickOnChar || clickOnSymbol) repeatedSymbol.value = true;
    } else {
      repeatedSymbol.value = false;
    }

    // Замена символа
    if (symbolToRemove.value && symbolToAdd.value && !repeatedSymbol.value){
      const keyNew = keyByValue(symbolToRemove.value, keyboard);  
      keyboard[keyNew] = symbolToAdd.value;
      symbolToRemove.value = '';
      symbolToAdd.value = '';
      clickOnChar = false;
      clickOnSymbol = false;
      repeatedSymbol.value = false;
      oldKey = '';
      store.updateKeyboard(keyboard, 'encryptKeyboard');
    }
  }

  // Вывод в шаблон построчно
  const divideObjectIntoRows = (inputObject, delimiterSymbols) => {
    const rows = [];
    const objectLength = Object.keys(inputObject).length;
    let currentRow = {};
    let i = 0;

    for (const key in inputObject) {
      i++;
      const value = inputObject[key];
      currentRow[key] = value;

      if (delimiterSymbols.includes(key) || i >= objectLength) {
        rows.push({ ...currentRow });
        currentRow = {};
      }
    }
    return rows;
  };

  const keyboardRows = computed(() => {
    let keys = [' ', 'Z'];
    if (window.innerWidth <= 670) {
      keys = ['E', 'U', 'k'];
    }
    else {
      keys = [' ', 'Z']
    };
    return divideObjectIntoRows(encryptKeyboard.value, keys)
  });

  const symbolsRows = computed(() => {
    let keys = ['◒', '⚚', '⚴'];
    if (window.innerWidth <= 670) {
      keys = ['▄', '☆', '✣', '⚦', '⚶'];
    }
    else {
      keys = ['◒', '⚚', '⚴'];
    }
    return divideObjectIntoRows(symbols.value, keys)
  });

  // отслеживание нажатий на клавиатуре, для быстрой замены символов
  document.addEventListener('keydown', (event) => {
    // отслеживаем нажатие только если не вводим данные в инпут
    if (!store.onInputFlag){
      changeCharactersByKeydown(encryptKeyboard.value, event);
    }
  }) 

  const changeCharactersByKeydown = (keyboard, event) => {
    if (keyboard[event.key] && event.ctrlKey === false){
      if (event.key === oldKey || oldKey === '') clickOnChar = !clickOnChar;
      if (event.key != oldKey && clickOnChar === false) clickOnChar = true;
      oldKey = event.key;
      symbolToRemove.value = keyboard[event.key];
      if (!clickOnChar) symbolToRemove.value = '';
    }
    if (event.key === 'Escape'){
      symbolToRemove.value = '';
      symbolToAdd.value = '';
    }
    if (symbolToAdd.value){
      const keyNew = keyByValue(symbolToRemove.value, keyboard);  
      if (keyNew){
        keyboard[keyNew] = symbolToAdd.value;
        symbolToRemove.value = '';
        symbolToAdd.value = '';
        clickOnChar = false;
        clickOnSymbol = false;
        repeatedSymbol.value = false;
      }
    }   
  }

  // сохранение новой клавиатуры в store

  const saveKeyboard = (newKeyboard, newKeyboardName) => {
    store.saveNewKeyboard(newKeyboard, newKeyboardName);
  }
</script>

<style lang="sass">
.keyboard
  padding: 0 20%
  @media screen and (max-width: 1550px) 
    padding: 0 10%
  @media screen and (max-width: 1250px) 
    padding: 0 0
.blue
  background-color: #bae8e8
.yellow
  background-color: #ffd803
.pink
  background-color: #ffc6c7
.keyboard-table
  width: 100%
.newAdd
  color: #ff8082
.newRemove
  color: #3dd2d2
.repeated
  color: #efcc03
.alert
  text-align: right
</style>