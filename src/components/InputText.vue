<template>
  <q-input
    class="input"
    :model-value="modelValue"
    @update:model-value="newValue => $emit('update:modelValue', newValue)"
    color="deep-purple-5"
    :label="label"
    outlined
    @keyup.esc="$emit('update:modelValue', '')"
    :type="isPwd ? 'password' : 'text'"
    ref="inputRef"
  >
    <template v-slot:append>
      <q-icon
        v-if="eyeIcon"
        :name="isPwd ? 'visibility_off' : 'visibility'"
        @click="isPwd = !isPwd"
        class="cursor-pointer input-icon"
      />
      <q-icon
        @click="$emit('update:modelValue', '')"
        class="cursor-pointer input-icon"
        name="close"
      />
    </template>
  </q-input>

  <div class="q-mt-md flex">
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
    label: {
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

<style lang="sass">
.input-icon
  @media (hover: hover) 
    &:hover
      color: #8a8a8a
</style>