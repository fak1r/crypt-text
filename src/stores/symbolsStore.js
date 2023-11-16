import { defineStore } from 'pinia'

export const useSymbolsStore = defineStore('symbolsStore', {
  state: () => ({
    keyboards: [
      {
        name: 'encryptKeyboard',
        symbols:  {
          '0': '♨', '1': '✡', '2': '✷', '3': '✥', '4': '▩', '5': '♜', '6': '♛', '7': '△', '8': '▤', '9': '▣', ' ': '%',
          'A': '▦', 'B': '✪', 'C': '✢', 'D': '✱', 'E': '▪', 'F': '✧', 'G': '✹', 'H': '✺', 'I': '▧', 'J': '▬',
          'K': '▨', 'L': '✤', 'M': '◩', 'N': '◬', 'O': '◪', 'P': '◭', 'Q': '✦', 'R': '✶', 'S': '✣', 'T': '✯',
          'U': '▢', 'V': '♚', 'W': '✰', 'X': '□', 'Y': '❅', 'Z': '▻',
          'a': '◧', 'b': '?', 'c': '▲', 'd': '◫', 'e': '♝', 'f': '◥', 'g': '♬', 'h': '♘', 'i': '♟', 'j': '♧',
          'k': '♙', 'l': '◯', 'm': '❃', 'n': '◮', 'o': '✸', 'p': '&', 'q': '♣', 'r': '!', 's': '№',
          't': '✵', 'u': '♞', 'v': '@', 'w': '✽', 'x': '✠', 'y': '✴', 'z': '∐'
        }
      }
    ],
    onInputFlag: false
  }),

  getters: {
    getKeyboardByName: (state) => {
      return (name) => {
        return state.keyboards.find(el => el.name === name).symbols;
      } 
    },
    onInput: (state) => {
      return (flagStatus) => {
        return state.onInputFlag = flagStatus
      }
    }
  },

  actions: {
    saveNewKeyboard(newKeyboard, newKeyboardName){
      this.keyboards.push({ 
        name: newKeyboardName, 
        symbols: newKeyboard
      });
    },
    updateKeyboard(updatedKeyboard, keyboardName){
      this.keyboards.find(el => el.name === keyboardName).symbols = updatedKeyboard;
    }
  }
})
