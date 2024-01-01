import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { db } from '../firebase/firebase'
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useAuthStore } from './authStore'

let keysCollection;
let getKeysSnapshot = null;

export const useSymbolsStore = defineStore('symbolsStore', () => {
  // Data
  const lang = ref('en-US');
  const currentKeyboardId = ref(null);
  const onInputFlag = ref(false);
  const keysLoaded = ref(true);
  const basicRusKeyboard = {
    'А': 'А', 'Б': 'Б', 'В': 'В', 'Г': 'Г', 'Д': 'Д', 'Е': 'Е', 'Ж': 'Ж', 'З': 'З', 'И': 'И', 'Й': 'Й',
    'К': 'К', 'Л': 'Л', 'М': 'М', 'Н': 'Н', 'О': 'О', 'П': 'П', 'Р': 'Р', 'С': 'С', 'Т': 'Т', 'У': 'У',
    'Ф': 'Ф', 'Х': 'Х', 'Ц': 'Ц', 'Ч': 'Ч', 'Ш': 'Ш', 'Щ': 'Щ', 'Ъ': 'Ъ', 'Ы': 'Ы', 'Ь': 'Ь', 'Э': 'Э', 'Ю': 'Ю', 'Я': 'Я',
    'а': 'а', 'б': 'б', 'в': 'в', 'г': 'г', 'д': 'д', 'е': 'е', 'ё': 'ё', 'ж': 'ж', 'з': 'з', 'и': 'и',
    'й': 'й', 'к': 'к', 'л': 'л', 'м': 'м', 'н': 'н', 'о': 'о', 'п': 'п', 'р': 'р', 'с': 'с',
    'т': 'т', 'у': 'у', 'ф': 'ф', 'х': 'х', 'ц': 'ц', 'ч': 'ч', 'ш': 'ш', 'щ': 'щ', 'ъ': 'ъ', 'ы': 'ы', 'ь': 'ь', 'э': 'э', 'ю': 'ю', 'я': 'я',
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', 
    ' ': ' ', ',': ',', '.': '.', '!': '!', '?': '?', ')': ')', '(': '(', '-': '-',
  };
  const basicEngKeyboard = {
    'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D', 'E': 'E', 'F': 'F', 'G': 'G', 'H': 'H', 'I': 'I', 'J': 'J',
    'K': 'K', 'L': 'L', 'M': 'M', 'N': 'N', 'O': 'O', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': 'T',
    'U': 'U', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': 'Z',
    'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e', 'f': 'f', 'g': 'g', 'h': 'h', 'i': 'i', 'j': 'j',
    'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't',
    'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z',
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', 
    ' ': ' ', ',': ',', '.': '.', '!': '!', '?': '?', ')': ')', '(': '(', '-': '-',
  };
  const keyboards = ref([
    {
      id: '1',
      name: 'Basic RUS key',
      symbols: basicRusKeyboard,
    },
  ]);
  const symbols = ref({
    '┐': '┐', '└': '└', '┴': '┴', '┌': '┌', '─': '─', '│': '│', '┘': '┘', '├': '├', '┤': '┤', '┬': '┬',
    '▒': '▒', '▓': '▓', '█': '█', '░': '░', '▀': '▀', '▄': '▄', '■': '■', '□': '□', '▲': '▲', '▼': '▼',
    '◆': '◆', '○': '○', '●': '●', '◐': '◐', '◑': '◑', '◒': '◒', '◓': '◓', '◔': '◔', '◕': '◕', '⌂': '⌂',
    '★': '★', '☆': '☆', '✪': '✪', '✽': '✽', '✦': '✦', '✯': '✯', '✰': '✰', '✶': '✶', '✷': '✷', '✵': '✵',
    '✹': '✹', '✺': '✺', '✸': '✸', '✻': '✻', '✠': '✠', '✡': '✡', '✢': '✢', '✣': '✣', '✤': '✤', '✥': '✥',
    '⚙': '⚙', '⚚': '⚚', '⚛': '⚛', '⚜': '⚜', '⚝': '⚝', '⚞': '⚞', '⚟': '⚟', '⚠': '⚠', 'œ': 'œ', '⚢': '⚢',
    '⚣': '⚣', '⚤': '⚤', '⚥': '⚥', '⚦': '⚦', '⚧': '⚧', '⚨': '⚨', '⚩': '⚩', 'Š': 'Š', 'Œ': 'Œ', '⚬': '⚬',
    '⚭': '⚭', '⚮': '⚮', '⚯': '⚯', '⚰': '⚰', '⚱': '⚱', '⚲': '⚲', '⚳': '⚳', '⚴': '⚴', '⚵': '⚵', '⚶': '⚶',
    '⚷': '⚷', '⚸': '⚸', '⚹': '⚹', '⚺': '⚺', '⚻': '⚻', '⚼': '⚼', '‡': '‡', '‰': '‰', '⚿': '⚿'
  });

  // Getters

  const getKeyboardByName = computed(() => {
    return (name) => {
      const key = keyboards.value.find(key => key.name === name);
      if (key){
        return key;
      } else {
        return ''
      }
    }
  });

  const getCurrentKey = computed(() => {
    const key = keyboards.value.find(key => key.id === currentKeyboardId.value);
    if (key){
      return key.symbols;
    } else {
      return ''
    }
  });

  const getKeyboardNames = computed(() => {
    const names = [];
    if (keyboards.value.length !== 0){
      keyboards.value.forEach(key => names.push(key.name));
    }
    return names;
  });

  const getKeyboardIds = computed(() => {
    const ids = [];
    if (keyboards.value.length !== 0){
      keyboards.value.forEach(key => ids.push(key.id));
    }
    return ids;
  });

  // Actions

  const init = () => {
    const authStore = useAuthStore();
    keysCollection = collection(db, "users", authStore.user.id, "keys");
    getKeys();
  };

  const getKeys = async () => {
    if (getKeysSnapshot){
      // Отмена подписки на получение ключей с сервера
      getKeysSnapshot();
    }
    keysLoaded.value = false;
    keyboards.value = [];

    getKeysSnapshot = onSnapshot(keysCollection, (querySnapshot) => {
      let keys = [];
      querySnapshot.forEach((doc) => {
        let symbols = JSON.parse(doc.data().symbols);
        let key = {
          id: doc.id,
          name: doc.data().name,
          symbols 
        }
        keys.push(key);
      });

      keyboards.value = keys;
      keysLoaded.value = true;
      if (keys.length !== 0){
        currentKeyboardId.value = String(keyboards.value.find(key => key === key).id);
      } else {
        currentKeyboardId.value = null;
      }
    }, error => {
      console.log('error.message:', error.message);
    });
  };

  const createNewKeyboardOnServer = async (newKeyboardName) => {
    let id = '1';
    let newKeyboard = basicEngKeyboard;
    if (lang.value.lang === 'Русский') {
      newKeyboard = basicRusKeyboard;
    }
    if (keyboards.value.find(id => id)){
      id = String(Number(keyboards.value.findLast(id => id).id) + 1);
    }
    newKeyboard = JSON.stringify(newKeyboard, null, 2);
    await setDoc(doc(keysCollection, id), {
      name: newKeyboardName,
      symbols: newKeyboard
    });
    currentKeyboardId.value = id;
  };

  const updateKeyboard = (updatedKeyboard) => {
    keyboards.value.find(key => key.id === currentKeyboardId.value).symbols = updatedKeyboard;
  };

  const editKeyboardName = async (id, newName) => {
    const currentId = currentKeyboardId.value;
    if (keyboards.value.find(key => key.name === newName)){
      return;
    } else {
      await updateDoc(doc(keysCollection, id), {
        name: newName
      });
      currentKeyboardId.value = currentId;
    }
  };

  const saveKeyboardOnServer = async () => {
    let currentKey = keyboards.value.find(key => key.id === currentKeyboardId.value);
    let name = currentKey.name;
    let key = JSON.stringify(currentKey.symbols, null, 2);
    await setDoc(doc(keysCollection, currentKeyboardId.value), {
      name: name,
      symbols: key
    });
  };

  const deleteKeyboardFromServer = async (id) => {
    const currentId = currentKeyboardId.value;
    await deleteDoc(doc(keysCollection, id));
    if (currentKeyboardId.value !== id && getKeyboardIds.value.length >= 1) {
      currentKeyboardId.value = currentId;
    }
    if (currentKeyboardId.value === id && getKeyboardIds.value.length >= 1) {
      // Если удалим текущий выбранный ключ
      currentKeyboardId.value = keyboards.value.find(key => key).id;
    } else if (getKeyboardIds.value.length === 0) {
      // Если удалим последний ключ
      currentKeyboardId.value = null;
    }
  };

  const clearKeys = () => {
    if (getKeysSnapshot){
      // Отмена подписки на получение ключей с сервера
      getKeysSnapshot();
    }
    keyboards.value = [
      {
        id: '1',
        name: 'Basic RUS key',
        symbols: basicRusKeyboard,
      },
    ];
    currentKeyboardId.value = '1';
  };

  return {
    keyboards, currentKeyboardId, onInputFlag, keysLoaded, lang, symbols, 
    getKeyboardByName, getCurrentKey, getKeyboardNames, getKeyboardIds,
    init, getKeys, createNewKeyboardOnServer, updateKeyboard, editKeyboardName, 
    saveKeyboardOnServer, deleteKeyboardFromServer, clearKeys
  }
})