<template>
  <div class="q-pa-md" style="max-width: 200px">
    <q-input
      v-model="encryptKeyboardText"
      filled
      ref="objectRef"
      type="textarea"
      cols="30"
      rows="50"
      class="encrypt-textarea"
    />
  </div>
</template>

<script setup>

  import { ref, watch } from 'vue';
  import { useFocusWithin } from '@vueuse/core';

  const props = defineProps({
    keyboard: {
      type: Object,
      required: true
    },
    focusOnInputs: {
      type: Boolean,
      required: true
    },
  });

  const emit = defineEmits(['update:keyboard', 'update:focusOnInputs']);

  const encryptKeyboardText = ref(JSON.stringify(props.keyboard, null, 2));
  const propsCopy = ref(props.keyboard);
  const objectRef = ref(null);

  // отслеживание изменений в textarea и обновление в объекте

  watch(encryptKeyboardText, (newText) => {
    try {
      emit('update:keyboard', JSON.parse(newText));
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  });

  // отслеживание изменений в объекте и обновление в textarea

  watch(propsCopy, (newVal) => {
    encryptKeyboardText.value = JSON.stringify(newVal, null, 2);
  }, { deep: true });
  
  // обновление propsCopy при изменении props.keyboard (без копии не отслеживает)

  watch(() => props.keyboard, (newVal) => {
    propsCopy.value = newVal;
  }, { deep: true });

  // проверка фокуса

  const { focused } = useFocusWithin(objectRef);

  watch(focused, focused => {
    if (focused) {
      emit('update:focusOnInputs', true)
    }
    else {
      emit('update:focusOnInputs', false)
    }
  })

</script>

<style lang="sass" scoped>
.encrypt-textarea
  font-size: 24px
  line-height: 20px
  height: 700px
.encrypt-object 
  width: 100%
  height: 700px 
  padding: 10px
  font-size: 16px
  border: 1px solid #ccc
  border-radius: 5px
  line-height: 1.5
  margin-left: 20px
  margin-top: 82px
  min-width: 150px
  max-width: 150px


.encrypt-object:focus 
  border-color: #007bff
  outline: none

  
</style>