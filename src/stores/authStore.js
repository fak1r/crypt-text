import { defineStore } from 'pinia'
import { ref } from 'vue';
import { auth } from '../firebase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signOut, onAuthStateChanged  } from "firebase/auth";
import { useSymbolsStore } from "./symbolsStore";
import { useRouter } from 'vue-router'
import { LocalStorage, Loading } from 'quasar';
import { showErrorMessage } from 'src/functions/function-show-error-message';

export const useAuthStore = defineStore('authStore', () => {
  // Data
  const user = ref({});
  const router = useRouter();
  const symbolsStore = useSymbolsStore();

  // Actions
  const init = () => {
    const symbolsStore = useSymbolsStore();

    onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        user.value.id = fbUser.uid;
        user.value.email = fbUser.email; 
        symbolsStore.init();
      } else {
        user.value = {};
        symbolsStore.clearKeys();
      }
    });
  }

  const registerUser = (email, password) => {
    Loading.show();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        symbolsStore.currentKeyboardId = null;
        LocalStorage.set('loggedIn', true)
        router.push('/');
        Loading.hide();
      }).catch((error) => {
        showErrorMessage(error.message);
      });
  };

  const loginUser = (email, password) => {  
    Loading.show();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        symbolsStore.init();
        LocalStorage.set('loggedIn', true)
        router.push('/');
        Loading.hide();
      }).catch((error) => {
        showErrorMessage(error.message);
      });
  };

  const logoutUser = () => {
    LocalStorage.set('loggedIn', false)
    signOut(auth).then().catch((error) => { console.log(error.message) });
  };

  return {
    user,
    init, registerUser, loginUser, logoutUser
  }
})