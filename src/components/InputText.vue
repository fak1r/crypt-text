<template>
  <q-input
    class="input"
    :model-value="modelValue"
    @update:model-value="newValue => $emit('update:modelValue', newValue)"
    color="deep-purple-5"
    :label="label"
    outlined
    @keyup.esc="$emit('update:modelValue', '')"
    @keyup.enter="$emit('enter-pressed')"
    :type="isPwd ? 'password' : 'text'"
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

  import { ref } from 'vue';

  defineProps({
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

  defineEmits(['update:modelValue', 'is-pwd-update', 'enter-pressed']);

  const isPwd = ref(true);

</script>

<style lang="sass">
.input-icon
  @media (hover: none) and (pointer: coarse)
    &:hover
      color: #8a8a8a
</style>