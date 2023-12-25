import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { db } from '../firebase/firebase'
import { collection, onSnapshot } from "firebase/firestore";


export const useSymbolsStore = defineStore('symbolsStore', () => {
  // Data
  const keyboards = ref([
/*     {
      id: 1,
      name: '(ENG) Public',
      symbols: {
        'A': '▦', 'B': '✪', 'C': '✢', 'D': '✱', 'E': '▪', 'F': '✧', 'G': '✹', 'H': '✺', 'I': '▧', 'J': '▬',
        'K': '▨', 'L': '✤', 'M': '◩', 'N': '◬', 'O': '◪', 'P': '◭', 'Q': '✦', 'R': '✶', 'S': '✣', 'T': '✯',
        'U': '▢', 'V': '♚', 'W': '✰', 'X': '□', 'Y': '❅', 'Z': '▻',
        'a': '◧', 'b': '?', 'c': '▲', 'd': '◫', 'e': '♝', 'f': '◥', 'g': '♬', 'h': '♘', 'i': '♟', 'j': '♧',
        'k': '♙', 'l': '◯', 'm': '❃', 'n': '◮', 'o': '✸', 'p': '&', 'q': '♣', 'r': '!', 's': '№',
        't': '✵', 'u': '♞', 'v': '@', 'w': '✽', 'x': '✠', 'y': '✴', 'z': '∐',
        '0': '♨', '1': '✡', '2': '✷', '3': '✥', '4': '▩', '5': '♜', '6': '♛', '7': '△', '8': '▤', '9': '▣', ' ': '%',
        ',': '⸘', '.': '¼', '!': '©', '?': '¶', ')': '~', '(': '÷', '-': '™',
      },
    },
    {
      id: 2,
      name: '(RUS) Public',
      symbols: {   
        'А': '▦', 'Б': '✪', 'В': '✢', 'Г': '✱', 'Д': '▪', 'Е': '✧', 'Ж': '✹', 'З': '✺', 'И': '▧', 'Й': '▬',
        'К': '▨', 'Л': '✤', 'М': '◩', 'Н': '◬', 'О': '◪', 'П': '◭', 'Р': '✦', 'С': '✶', 'Т': '✣', 'У': '✯',
        'Ф': '▢', 'Х': '♚', 'Ц': '✰', 'Ч': '□', 'Ш': '❅', 'Щ': '▻', 'Ъ': '◌', 'Ы': '✾', 'Ь': '❖', 'Э': '☆', 'Ю': '⍟', 'Я': '✵',
        'а': '◧', 'б': '?', 'в': '▲', 'г': '◫', 'д': '♝', 'е': '◥', 'ё': '♬', 'ж': '♘', 'з': '♟', 'и': '♧',
        'й': '♙', 'к': '◯', 'л': '❃', 'м': '◮', 'н': '✸', 'о': '&', 'п': '♣', 'р': '!', 'с': '№',
        'т': 'α', 'у': '♞', 'ф': '@', 'х': '✽', 'ц': '✠', 'ч': '✴', 'ш': 'β', 'щ': 'ε', 'ъ': 'ζ', 'ы': 'ψ', 'ь': 'σ', 'э': 'η', 'ю': 'Ξ', 'я': 'Λ',
        '0': '♨', '1': '✡', '2': '✷', '3': '✥', '4': '▩', '5': '♜', '6': '♛', '7': '△', '8': '▤', '9': '▣', ' ': '%',
        ',': '⸘', '.': '¼', '!': '©', '?': '¶', ')': '~', '(': '÷', '-': '™',
      },
    } */
  ]);
  const currentKeyboardId = ref(null);
  const onInputFlag = ref(false);
  const lang = ref('en-US');
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
  })
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

  const onInput = computed(() => {
    return (flagStatus) => {
      return onInputFlag.value = flagStatus
    }
  });

  const getKeyboardNames = computed(() => {
    const names = [];
    keyboards.value.forEach(key => names.push(key.name));
    return names;
  });

  const getKeyboardIds = computed(() => {
    const ids = [];
    keyboards.value.forEach(key => ids.push(key.id));
    return ids;
  });

  // Actions

  const getKeys = async () => {
    // const querySnapshot = await getDocs(collection(db, "keys"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots

    //   let symbols = JSON.parse(doc.data().symbols);
    //   let key = {
    //     id: doc.id,
    //     name: doc.data().name,
    //     symbols 
    //   }
    //   keyboards.value.push(key);
    // });
    onSnapshot(collection(db, "keys"), (querySnapshot) => {
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
      if (!currentKeyboardId.value){
        currentKeyboardId.value = String(keyboards.value.find(key => key === key).id);
      }
    });   
  };

  const createNewKeyboard = (newKeyboardName) => {
    let id = 0;
    let newKeyboard = basicEngKeyboard;
    if (lang.value.lang === 'Русский') {
      newKeyboard = basicRusKeyboard;
    }
    if (keyboards.value.find(id => id)){
      id = keyboards.value.findLast(id => id).id + 1;
    }
    keyboards.value.push({
      id: id,
      name: newKeyboardName,
      symbols: newKeyboard
    });
    currentKeyboardId.value = id;
  };

  const updateKeyboard = (updatedKeyboard) => {
    keyboards.value.find(key => key.id === currentKeyboardId.value).symbols = updatedKeyboard;
  };

  const deleteKeyboard = (id) => {
    keyboards.value = keyboards.value.filter(key => key.id !== id);
    if (currentKeyboardId.value === id && getKeyboardIds.value.length >= 1) {
      // Условие выполнится, если удалим текущий выбранный ключ
      currentKeyboardId.value = keyboards.value.find(key => key).id;
    } else if (getKeyboardIds.value.length === 0) {
      // Условие выполнится, если удалим последний ключ
      currentKeyboardId.value = null;
    }
  };

  const editKeyboardName = (id, newName) => {
    if (keyboards.value.find(key => key.name === newName)){
      return;
    } else {
      const keyToRename = keyboards.value.find(key => key.id === id);
      keyToRename.name = newName;
    }
  };


  return {
    keyboards, currentKeyboardId, onInputFlag, lang, symbols, 
    getKeyboardByName, getCurrentKey, onInput, getKeyboardNames, getKeyboardIds,
    getKeys, createNewKeyboard, updateKeyboard, deleteKeyboard, editKeyboardName
  }
})