<template>
  <div class="parent-container">
    <div class="child-container">
      <div class="q-pt-md">
        <q-input
          ref="inputAddNewRef"
          v-model="createNewKeyName"
          color="teal"
          :placeholder="store.lang.placeholderNewKeyboard"
          outlined
          type="text"
        />
        <q-btn
          @click="createKeyboard"
          class="btn q-my-md"
          no-caps
        >{{ store.lang.btnSaveKey }}
        </q-btn>
        <span class="alert-same-name">{{ alertSameName }}</span>
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

        <q-dialog v-model="deleteModal" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm">{{ store.lang.deleteKeyNotice }}</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Delete" text-color="red" color="primary" @click="store.deleteKeyboard(keyIdToDelete)" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="editModal" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">{{ store.lang.editKeyNotice }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input dense v-model="editedKeyName" autofocus @keyup.enter="editModal = false" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Save" v-close-popup @click="editKeyboardName(keyIdToRename)"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { computed, ref, watch } from 'vue';
  import { useFocusWithin } from '@vueuse/core';
  import { useSymbolsStore } from 'src/stores/symbolsStore'

  const store = useSymbolsStore();

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
      store.createNewKeyboard(createNewKeyName.value);
      alertSameName.value = '';
      createNewKeyName.value = '';
    }
  };

  const editKeyboardName = (keyIdToRename) => {
    const sameNamedKey = store.keyboards.find(key => key.name === editedKeyName.value);
    if (sameNamedKey && sameNamedKey.id !== keyIdToRename){
      alertSameName.value = store.lang.repeatedKey;
    } else {
      store.editKeyboardName(keyIdToRename, editedKeyName.value)
      alertSameName.value = '';
    }
  }

  // Перевод алёрта на другой язык

  store.$subscribe(() => {   
    if (alertSameName.value !== '') {
      alertSameName.value = store.lang.repeatedKey;
    }
  }, { detached: true })

  // Проверка фокуса на инпуте

  const inputAddNewRef = ref(null);
  const { focused } = useFocusWithin(inputAddNewRef);

  watch(focused, focused => {
    if (focused) {
      store.onInput(true);
      alertSameName.value = '';
    } else {
      store.onInput(false);
    }
  });

  watch(editModal, newState => {
    if (newState === true){
      alertSameName.value = '';
      store.onInput(true);
    } else {
      store.onInput(false);
    }
  })
  
  // Подсветка выбранного ключа

  const currentKeyStyle = computed(() => {
    return (keyboard) => {
      return keyboard.id === store.currentKeyboardId ? 'bg-green-2' : 'bg-orange-2'
    }
  });

</script>

<style lang="sass">
.alert-same-name
  margin-left: 16px
  color: red
  @media screen and (max-width: 560px)
    display: block
    margin-left: 0
    margin-bottom: 16px
</style>