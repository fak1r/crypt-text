<template>
  <div class="parent-container q-pt-md">
    <div class="child-container">
      <div class="h1 text-center">{{ store.lang.keyListTitle }}</div>
      <div class="q-pt-md">
        {{ store.lang.keyListText }}
      </div>
      <div class="q-pt-md">
        <q-list separator bordered >
          <q-item
            :class="currentKeyStyle(keyboard)"
            v-for="keyboard in store.keyboards"
            :key="keyboard.id"
          >
            <q-item-section >
              <q-item-label>{{ keyboard.name }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="row">
                <q-btn
                  color="blue-5"
                  icon="edit"
                  flat
                  round
                  dense
                  @click="keyIdToRename = keyboard.id, editModal = true, editedKeyName = keyboard.name"
                />
                <q-btn
                  color="red-5"
                  icon="delete"
                  flat
                  round
                  dense
                  @click="keyIdToDelete = keyboard.id, deleteModal = true"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="q-pt-md" ref="inputAddNewRef">
          <span v-if="alertSameName && !editModal" class="alert-same-name">{{ alertSameName }}</span>
          <input-text
            v-model="createNewKeyName"
            :label="store.lang.labelNewKeyboard"
            @enter-pressed="createKeyboard"
          >   
            <template #buttons>
              <q-btn
                @click="createKeyboard"
                class="btn q-mr-md q-mb-md"
                no-caps
              >{{ store.lang.btnSaveKey }}
              </q-btn>
            </template>
          </input-text>
        </div>

        <q-dialog v-model="deleteModal" persistent>
          <q-card class="modal">
            <q-card-section class="row items-center">
              <span class="q-ml-sm">{{ store.lang.deleteKeyNotice }}</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" text-color="black" v-close-popup />
              <q-btn
                v-close-popup
                @click="deleteKeyFromServer()"
                color="primary"
                label="Delete"
                text-color="red"
                flat
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="editModal" persistent>
          <q-card class="modal" style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">{{ store.lang.editKeyNotice }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input dense v-model="editedKeyName" autofocus @keyup.enter="editModal = false" />
            </q-card-section>

            <span v-if="alertSameName" class="alert-same-name">{{ alertSameName }}</span>

            <q-card-actions align="right" class="text-black">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Save" @click="editKeyboardName(keyIdToRename)"/>
            </q-card-actions>

          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { computed, ref, watch } from 'vue';
  import { useSymbolsStore } from 'src/stores/symbolsStore';
  import { useAuthStore } from 'src/stores/authStore';
  import { useFocusWithin } from '@vueuse/core';
  import InputText from './InputText.vue';
  
  const store = useSymbolsStore();
  const authStore = useAuthStore();

  const deleteModal = ref(false);
  const keyIdToDelete = ref(0);
  const editModal = ref(false);
  const keyIdToRename = ref(0);
  const editedKeyName = ref('');

  // Сохранение новой клавиатуры в store

  const createNewKeyName = ref('');
  const alertSameName = ref('');

  const createKeyboard = () => {
    if (store.keyboards.find(key => key.name === createNewKeyName.value)){
      alertSameName.value = store.lang.repeatedKey;
    } else {
      store.createNewKeyboardOnServer(createNewKeyName.value);
      alertSameName.value = '';
      createNewKeyName.value = '';
    }
  };

  const editKeyboardName = (keyIdToRename) => {
    const newKeyName = editedKeyName.value.trim();
    const sameNamedKey = store.keyboards.find(key => key.name === newKeyName);
    
    if (sameNamedKey && sameNamedKey.id !== keyIdToRename){
      alertSameName.value = store.lang.repeatedKey;
    } else {
      store.editKeyboardName(keyIdToRename, newKeyName)
      alertSameName.value = '';
      editModal.value = false;
    }
  };

  // Перевод алёрта на другой язык и скрытие при фокусе на инпут

  store.$subscribe(() => {  
    if (store.onInputFlag){
      alertSameName.value = '';
    } 
    if (alertSameName.value !== ''){
      alertSameName.value = store.lang.repeatedKey;
    }
  }, { detached: true });

  watch(editModal, newState => {
    if (newState === true){
      alertSameName.value = '';
      store.onInputFlag = true;
    } else {
      alertSameName.value = '';
      store.onInputFlag = false;
    }
  });
  
  // Подсветка выбранного ключа

  const currentKeyStyle = computed(() => {
    return (keyboard) => {
      return keyboard.id === store.currentKeyboardId ? 'bg-green-2' : 'bg-orange-2'
    }
  });

  // Удаление ключа с сервера

  const deleteKeyFromServer = () => {
    if (authStore.user.email){
      store.deleteKeyboardFromServer(keyIdToDelete.value);
    }
  }

  // Проверка фокуса на инпуте
  
  const inputAddNewRef = ref(null);
  const { focused } = useFocusWithin(inputAddNewRef);

  watch(focused, focused => {
    if (focused){
      store.onInputFlag = true;
    } else {
      store.onInputFlag = false;
    }
  });
</script>

<style lang="sass">
.alert-same-name
  color: red
  line-height: 3
  text-align: center
  display: block
  margin-bottom: 16px
.modal
  background-color: #babdc8
</style>