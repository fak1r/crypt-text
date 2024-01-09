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
            <q-item-section @click="store.currentKeyboardId = keyboard.id">
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
          <q-input
            class="input"
            v-model="createNewKeyName"
            color="deep-purple-5"
            :label="store.lang.labelNewKeyboard"
            outlined
            ref="newKeyRef"
            @keyup.esc="createNewKeyName = ''"
            @keyup.enter="createKeyboard"
            no-caps
            :rules="[ val => isValidKeyName(val, createNewKeyName) || store.lang.newKeyNameValidation ]"
            lazy-rules
          />
          <q-btn
            @click="createKeyboard"
            class="btn"
            :class="alertMargin"
            no-caps
          >{{ store.lang.btnSaveKey }}
          </q-btn>
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
              <q-input
                v-model="editedKeyName"
                @keyup.enter="editModal = false"
                dense
                ref="editNameKeyRef"
                :rules="[ val => isValidKeyName(val, editedKeyName) || store.lang.newKeyNameValidation ]"
                lazy-rules
              />
            </q-card-section>

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
  
  const store = useSymbolsStore();
  const authStore = useAuthStore();

  const deleteModal = ref(false);
  const keyIdToDelete = ref(0);
  const editModal = ref(false);
  const keyIdToRename = ref(0);
  const editedKeyName = ref('');

  // Сохранение нового ключа в store
  
  const createNewKeyName = ref('');
  const newKeyRef = ref(null);
  const alertMargin = ref('');

  const isValidKeyName = (key, newName) => {
    let notSameName = true;
    if (!editModal.value) alertMargin.value = 'q-mt-md';
    if (store.keyboards.find(key => key.name === newName.trim())){
      notSameName = false;
    }
    return String(key).trim().match(/^.+/) && notSameName;
  };

  const createKeyboard = () => {
    const newKeyName = createNewKeyName.value.trim();
    newKeyRef.value.validate();
    if (!newKeyRef.value.hasError){
      store.createNewKeyboardOnServer(newKeyName);
      createNewKeyName.value = '';
      newKeyRef.value.resetValidation();
      alertMargin.value = '';
    }
  };

  // Изменение имени ключа

  const editNameKeyRef = ref(null);

  const editKeyboardName = (keyIdToRename) => {
    const newKeyName = editedKeyName.value.trim();
    editNameKeyRef.value.validate();

    if (!editNameKeyRef.value.hasError){
      store.editKeyboardName(keyIdToRename, newKeyName);
      editModal.value = false;
      editNameKeyRef.value.resetValidation();
    }
  };
  
  // Подсветка выбранного ключа

  const currentKeyStyle = computed(() => {
    return (keyboard) => {
      return keyboard.id === store.currentKeyboardId ? 'bg-green-2' : 'bg-orange-2';
    };
  });

  // Удаление ключа с сервера

  const deleteKeyFromServer = () => {
    if (authStore.user.email){
      store.deleteKeyboardFromServer(keyIdToDelete.value);
    }
  };

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

  // Проверка фокуса на модальном окне

  watch(editModal, newState => {
    if (newState === true){
      store.onInputFlag = true;
    } else {
      store.onInputFlag = false;
      alertMargin.value = '';
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