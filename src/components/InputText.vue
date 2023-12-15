<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="newValue => $emit('update:modelValue', newValue)"
    color="deep-purple-5"
    :placeholder="placeholder"
    outlined
    @keyup.esc="$emit('update:modelValue', '')"
    :type="isPwd ? 'password' : 'text'"
    ref="inputRef"
  >
    <template v-slot:append>
      <q-icon name="close" @click="$emit('update:modelValue', '')" class="cursor-pointer" />
      <q-icon
        v-if="eyeIcon"
        :name="isPwd ? 'visibility_off' : 'visibility'"
        @click="isPwd = !isPwd"
        class="cursor-pointer"
      />
    </template>
  </q-input>

  <div class="q-py-md flex">
    <slot name="buttons"></slot>
  </div>    

</template>

<script setup>

  import { ref, watch } from 'vue';
  import { useFocusWithin } from '@vueuse/core';
  import { useSymbolsStore } from 'src/stores/symbolsStore';

  const store = useSymbolsStore();

  const props = defineProps({
    modelValue: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Введите что-нибудь'
    },
    eyeIcon: {
      type: Boolean,
      required: false,
      default: false
    }
  });

  const emit = defineEmits(['update:modelValue', 'is-pwd-update']);

  const isPwd = ref(false);
  
  // Проверка фокуса на инпуте
  
  const inputRef = ref(null);
  const { focused } = useFocusWithin(inputRef);

  watch(focused, focused => {
    if (focused) {
      store.onInput(true);
    } else {
      store.onInput(false);
    }
  });

</script>