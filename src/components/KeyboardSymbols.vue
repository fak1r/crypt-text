<template>
  <div class="keyboard">
    <table class="keyboard-table">
      <tr>
        <td colspan="26">
          <h1 class="h1">Encrypted Keyboard:</h1>
        </td>
      </tr>
      <tr v-for="(cryptRow, index) in keyboardRows" :key="index">
        <td
          v-for="(cryptChar, key) in cryptRow"
          :key="key"
          @click="chooseSymbolsToChange(cryptChar, encryptKeyboard)"
          :class="{ yellow: symbolToRemove === cryptChar, pink: symbolToRemove !== cryptChar }"
        >
          <div class="h1">{{ key }}:</div>
          <div class="h1">{{ cryptChar }}</div>
        </td>
      </tr>
      <tr>
        <td colspan="26">
          <div class="h1">Special symbols:</div>
        </td>
      </tr>
      <tr v-for="(symbolsRow, index) in symbolsRows" :key="index">
        <td
          v-for="(symbol, key) in symbolsRow"
          :key="key"
          @click="chooseSymbolsToChange(symbol, encryptKeyboard, true)"
          :class="{ yellow: symbolToAdd === symbol, blue: symbolToAdd !== symbol }"
        >
          <div class="h1">{{ symbol }}</div>
        </td>
      </tr>
    </table>
    <div class="alert">
      <p class="h1 repeated" v-if="repeatedSymbol">
        This symbol already in keyboard
      </p>
      <p class="h1 newRemove" v-if="symbolToRemove && !repeatedSymbol">
        Choose new special symbol
      </p>
      <p class="h1 newAdd" v-if="symbolToAdd && !repeatedSymbol">
        Choose symbol to change
      </p>
    </div>
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

  const symbols = ref({
    '┐': '┐', '└': '└', '┴': '┴', '┌': '┌', '─': '─', '│': '│', '┘': '┘', '├': '├', '┤': '┤', '┬': '┬',
    '▒': '▒', '▓': '▓', '█': '█', '░': '░', '▀': '▀', '▄': '▄', '■': '■', '□': '□', '▲': '▲', '▼': '▼',
    '◆': '◆', '○': '○', '●': '●', '◐': '◐', '◑': '◑', '◒': '◒', '◓': '◓', '◔': '◔', '◕': '◕', '⌂': '⌂',
    '★': '★', '☆': '☆', '✪': '✪', '✽': '✽', '✦': '✦', '✯': '✯', '✰': '✰', '✶': '✶', '✷': '✷', '✵': '✵',
    '✹': '✹', '✺': '✺', '✸': '✸', '✻': '✻', '✠': '✠', '✡': '✡', '✢': '✢', '✣': '✣', '✤': '✤', '✥': '✥',
    '⚙': '⚙', '⚚': '⚚', '⚛': '⚛', '⚜': '⚜', '⚝': '⚝', '⚞': '⚞', '⚟': '⚟', '⚠': '⚠', 'œ': 'œ', '⚢': '⚢',
    '⚣': '⚣', '⚤': '⚤', '⚥': '⚥', '⚦': '⚦', '⚧': '⚧', '⚨': '⚨', '⚩': '⚩', 'Š': 'Š', 'Œ': 'Œ', '⚬': '⚬',
    '⚭': '⚭', '⚮': '⚮', '⚯': '⚯', '⚰': '⚰', '⚱': '⚱', '⚲': '⚲', '⚳': '⚳', '⚴': '⚴', '⚵': '⚵', '⚶': '⚶',
    '⚷': '⚷', '⚸': '⚸', '⚹': '⚹', '⚺': '⚺', '⚻': '⚻', '⚼': '⚼', '‡': '‡', '‰': '‰', '⚿': '⚿',
    // Добавьте или измените символы по вашему желанию
  });

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

  // Вывод клавиатуры в шаблон в три строки: цифры, заглавные, строчные
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

  const keyboardRows = computed(() => divideObjectIntoRows(encryptKeyboard.value, [' ', 'Z']));
  const symbolsRows = computed(() => divideObjectIntoRows(symbols.value, ['◒', '⚚', '⚴']));

  // отслеживание нажатий на клавиатуре, для быстрой замены символов

  document.addEventListener('keydown', (e) => {
    // отслеживаем нажатие только если не вводим данные в инпут
    if (!store.onInputFlag){
      changeCharactersByKeydown(encryptKeyboard.value, e.key);
    }
  }) 

  const changeCharactersByKeydown = (keyboard, key) => {
    if (keyboard[key]){
      if (key === oldKey || oldKey === '') clickOnChar = !clickOnChar;
      if (key != oldKey && clickOnChar === false) clickOnChar = true;
      oldKey = key;
      symbolToRemove.value = keyboard[key];
      if (!clickOnChar) symbolToRemove.value = '';
    }
    if (key === 'Escape'){
      symbolToRemove.value = '';
      symbolToAdd.value = '';
    }
    if (symbolToAdd.value){
      const keyNew = keyByValue(symbolToRemove.value, keyboard);  
      keyboard[keyNew] = symbolToAdd.value;

      symbolToRemove.value = '';
      symbolToAdd.value = '';
      clickOnChar = false;
      clickOnSymbol = false;
      repeatedSymbol.value = false;
    }   
  }

  // сохранение новой клавиатуры в store

  const saveKeyboard = (newKeyboard, newKeyboardName) => {
    store.saveNewKeyboard(newKeyboard, newKeyboardName);
  }
</script>

<style lang="sass">
.blue
  background-color: #bae8e8
.yellow
  background-color: #ffd803
.pink
  background-color: #ffc6c7
.h1
  display: block
  font-size: 24px
  font-weight: bold
  @media screen and (max-width: 860px) 
    font-size: 16px
.newAdd
  color: #ff8082
.newRemove
  color: #3dd2d2
.repeated
  color: #efcc03
.alert
  margin-top: 25px
  height: 40px
</style>