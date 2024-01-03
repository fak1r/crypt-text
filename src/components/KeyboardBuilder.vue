<template>
  <div class="parent-container">
    <div class="child-container">
      <div class="h1 text-center">{{ store.lang.builderTitle }}</div>
      <div class="q-py-md">
        {{ store.lang.builderText }}
      </div>
      <q-linear-progress
        class="q-mb-md"
        color="primary"
        size="20px"
        indeterminate
        v-if="!store.keysLoaded"
      />
      <table ref="tableRef">
        <tr>
          <td colspan="16">
            <div class="h2">
              {{ store.lang.builderKeyboard }} 
              <span class="h2" v-if="!encryptKeyboard">{{ store.lang.emptyKey }}</span>
            </div>
          </td>
        </tr>
        <tr
          v-for="(item, index) in chunkedKeyValuePairs(encryptKeyboard, symbolsInRow)"
          :key="index"
          class="text-center"
        >
          <td
            v-for="(value, key) in item"
            :key="key"
            class="h2"
            @click="chooseSymbolsToChange(value, encryptKeyboard)"
            :class="{ yellow: symbolToRemove === value, pink: symbolToRemove !== value }"
          >
            <div class="no-wrap">{{ key }}:</div>
            <div class="no-wrap">{{ value }}</div> 
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="h2">{{ store.lang.builderSymbols }}</div>
          </td>
          <td colspan="30">
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
        <tr
          v-for="(item, index) in chunkedKeyValuePairs(symbols, symbolsInRow)"
          :key="index"
          class="text-center"
        >
          <td
            v-for="(symbol, key) in item"
            :key="key"
            class="h2"
            @click="chooseSymbolsToChange(symbol, encryptKeyboard, true)"
            :class="{ yellow: symbolToAdd === symbol, blue: symbolToAdd !== symbol }"
          >
            {{ symbol }}
          </td>
        </tr>
      </table>
      <q-btn
        @click="randomizeKey"
        class="btn q-mt-md q-mr-md"
        no-caps
        :disable="!store.currentKeyboardId"
      >{{ store.lang.randomizeKey }}
      </q-btn>
      <q-btn
        v-if="authStore.user.email"
        @click="saveKeyOnServer"
        class="btn q-mt-md"
        no-caps
        :disable="!store.currentKeyboardId"
      >{{ store.lang.btnSaveOnServer }}
      </q-btn>
    </div>
  </div>
</template>

<script setup>

  import { ref, onMounted } from 'vue';
  import { useSymbolsStore } from 'src/stores/symbolsStore';
  import { useAuthStore } from 'src/stores/authStore';
  import { onClickOutside } from '@vueuse/core'
  
  const store = useSymbolsStore();
  const authStore = useAuthStore();

  const encryptKeyboard = ref(store.getCurrentKey);

  // Обновление данных при изменении в state Pinia
  
  store.$subscribe(() => {  
    encryptKeyboard.value = store.getCurrentKey;
  }, { detached: true })

  const symbols = ref(store.symbols);

  // Замена символов по клику

  let symbolToRemove = ref('');
  let symbolToAdd = ref('');
  let repeatedSymbol = ref('');
  let clickOnChar = false;
  let clickOnSymbol = false;
  let oldKey = '';

  const keyByValue = (symbol, keyboard) => {
    return Object.keys(keyboard).find(key => keyboard[key] === symbol);
  };

  const chooseSymbolsToChange = (symbol, keyboard, clickOnSymbols = false) => {
    repeatedSymbol.value = false;
    const key = keyByValue(symbol, keyboard);

    // Если кликнули на клавиатуру
    if (key){
      if (key === oldKey || oldKey === '') clickOnChar = !clickOnChar;
      if (key != oldKey && clickOnChar === false) clickOnChar = true;
      oldKey = key;
      symbolToRemove.value = symbol;
      if (!clickOnChar) symbolToRemove.value = '';
    } else {
      if (symbol === symbols.value[symbolToAdd.value]) {
        clickOnSymbol = !clickOnSymbol;
      } else {
        clickOnSymbol = true;
      }
      oldKey = key;
      symbolToAdd.value = symbol;
      if (!clickOnSymbol) symbolToAdd.value = '';    
    }

    // Проверка на наличие повторов
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
    }
  };

  // Если кликнули мимо клавиатуры

  const tableRef = ref(null);
  
  onClickOutside(tableRef, event => {
    symbolToRemove.value = '';
    symbolToAdd.value = '';
    repeatedSymbol.value = '';
    oldKey = '';
    clickOnChar = false;
    clickOnSymbol = false;
  });

  // Вывод в шаблон построчно

  const chunkedKeyValuePairs = (inputObject, chunkSize) => {
    // Преобразование объекта в массив для удобства обработки
    const arrayFromObject = Object.entries(inputObject);
    
    // Разделение массива данных на подмассивы заданного размера
    return arrayFromObject.reduce((resultArray, [key, value], index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = {}; // Начало нового подмассива
      }

      resultArray[chunkIndex][key] = value;
      return resultArray;
    }, [])
  };

  let symbolsInRow = ref(16);
  let containerWidth = 0;

  const symbolsInRowCounter = () => {
    // Высчитываем количество символов на строке, прибавляя 2 символа каждые 54px. Максимум 34, минимум 16.
    symbolsInRow.value = Math.min(34, 16 + Math.floor((Math.max(containerWidth, 450) - 450) / 54) * 2);
  };

  onMounted(() => {
    containerWidth = document.querySelector('.parent-container').offsetWidth;
    symbolsInRowCounter();
  });

  window.addEventListener('resize', () => {
    containerWidth = document.querySelector('.parent-container').offsetWidth;
    symbolsInRowCounter();
  });

  // Отслеживание нажатий на клавиатуре, для быстрой замены символов

  document.addEventListener('keydown', (event) => {
    clickOnSymbol = false;
    repeatedSymbol.value = false;
    // Отслеживаем нажатие только если не вводим данные в инпут
    if (!store.onInputFlag){
      changeCharactersByKeydown(encryptKeyboard.value, event);
    }
  });

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
  };

  // Получение уникального ключа

  const randomizeKey = () => {
    const symbolsArray = Object.values(symbols.value);
    const keyboardKeys = Object.keys(encryptKeyboard.value);

    const shuffledSymbols = [...symbolsArray];

    // Реализуем алгоритм Фишера-Йейтса для перемешивания массива
    for (let i = shuffledSymbols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledSymbols[i], shuffledSymbols[j]] = [shuffledSymbols[j], shuffledSymbols[i]];
    }

    // Заполняем кнопки случайными символами
    for (let i = 0; i < keyboardKeys.length; i++) {
      encryptKeyboard.value[keyboardKeys[i]] = shuffledSymbols[i];
    }
  };

  // Сохранение ключа на сервере

  const saveKeyOnServer = () => {
    if (authStore.user.email && store.getCurrentKey && store.currentKeyboardId){
      store.saveKeyboardOnServer();
      alert(store.lang.alertSaveOnServer);
    } else {
      alert('Please login');
    }
  };
</script>

<style lang="sass">
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
.keyboardSelector
  width: 200px
</style>