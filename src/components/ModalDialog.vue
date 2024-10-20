<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-dialog persistent v-model="props.modelValue">
    <q-card ref="clickOutsideRef" class="secret-answer">
      <q-card-section>
        <div class="text-h6">{{ props.title }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll">
        <div class="result">
          <span class="h2">{{ resultText }}</span>
          <q-icon
            :name="isVisible ? 'visibility_off' : 'visibility'"
            class="cursor-pointer q-ml-sm"
            @click="isVisible = !isVisible"
            size="24px"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <div>
          <q-btn @click="copy(text)" flat no-caps>{{ store.lang.btnCopy }} </q-btn>
          <div class="decrypt-copy-tooltip">
            <q-tooltip v-model="showTooltip" :offset="[0, 45]" anchor="top middle" self="bottom middle"
              >{{ store.lang.copyTooltip }}
            </q-tooltip>
          </div>
        </div>
        <q-btn @click="$emit('clear-text')" flat no-caps>{{ store.lang.btnClear }} </q-btn>
        <q-btn flat label="Ok" @click="$emit('update:modelValue', false)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

import { useSymbolsStore } from 'src/stores/symbolsStore'
import { useClipboard, onClickOutside } from '@vueuse/core'

const store = useSymbolsStore()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  tooltip: {
    type: String,
    default: '',
  },
})

let isVisible = ref(true)

const emit = defineEmits(['update:modelValue', 'clear-text'])

// Скрытие при клике за окно

const clickOutsideRef = ref(null)
onClickOutside(clickOutsideRef, () => emit('update:modelValue', false))

// Tooltip copied

const { copy, copied } = useClipboard({ source: props.text })
const showTooltip = ref(false)

const visibleText = computed(() => props.text)
const hiddenText = computed(() => props.text.replace(/./g, '*'))

const resultText = computed(() => (isVisible.value ? hiddenText.value : visibleText.value))

watch(copied, (copiedUpdate) => {
  if (copiedUpdate) {
    showTooltip.value = true
  } else {
    showTooltip.value = false
  }
})
</script>

<style lang="sass">
.secret-answer
  background-color: #babdc8
.result
  display: flex
  align-items: center
  justify-content: space-between
  word-break: break-all
</style>
