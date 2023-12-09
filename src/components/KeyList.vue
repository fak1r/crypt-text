<template>
  <div class="parent-container">
    <div class="child-container">
      <div class="q-pt-md">
        <q-input
          ref="inputRef"
          v-model="newKeyboardName"
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
              <q-btn
                color="red-5"
                icon="delete"
                flat
                round
                dense
                @click="keyIdToDelete = keyboard.id, deleteModal = true"
              />
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

  // Сохранение новой клавиатуры в store

  const newKeyboardName = ref('');
  const alertSameName = ref('');

  const createKeyboard = () => {
    if (store.keyboards.find(key => key.name === newKeyboardName.value)){
      alertSameName.value = store.lang.repeatedKey;
    } else {
      store.createNewKeyboard(newKeyboardName.value);
      alertSameName.value = '';
    }
  };

  // Перевод алёрта на другой язык

  store.$subscribe(() => {   
    if (alertSameName.value !== '') {
      alertSameName.value = store.lang.repeatedKey;
    }
  }, { detached: true })

  // Проверка фокуса на инпуте

  const inputRef = ref(null);
  const { focused } = useFocusWithin(inputRef);

  watch(focused, focused => {
    if (focused) {
      store.onInput(true);
      alertSameName.value = '';
    } else {
      store.onInput(false);
    }
  });

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