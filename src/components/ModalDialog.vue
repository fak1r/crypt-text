<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-dialog persistent v-model="props.modelValue" >
    <q-card ref="clickOutsideRef" class="secret-answer">
      <q-card-section>
        <div class="text-h6">{{ props.title }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <p class="h2">{{ text }}</p>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <div>
          <q-btn
            @click="copy(text)"
            flat
            no-caps
          >{{ store.lang.btnCopy }}
          </q-btn>
          <div class="decrypt-copy-tooltip">
            <q-tooltip
              v-model="showTooltip"
              :offset="[0, 45]"
              anchor="top middle"
              self="bottom middle"
            >{{ store.lang.copyTooltip }}
            </q-tooltip>
          </div>
        </div>
        <q-btn
          @click="$emit('clear-text')"
          flat
          no-caps
        >{{ store.lang.btnClear }}
        </q-btn>
        <q-btn flat label="Ok" @click="$emit('update:modelValue', false)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>

  import { ref, watch } from 'vue';

  import { useSymbolsStore } from 'src/stores/symbolsStore';
  import { useClipboard, onClickOutside } from '@vueuse/core';

  const store = useSymbolsStore();

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['update:modelValue', 'clear-text']);

  // Скрытие при клике за окно

  const clickOutsideRef = ref(null);
  onClickOutside(clickOutsideRef, () => emit('update:modelValue', false));

  // Tooltip copied

  const { copy, copied } = useClipboard({ source: props.text });
  const showTooltip = ref(false);

  watch(copied, copiedUpdate => {
    if (copiedUpdate){
      showTooltip.value = true;
    } else {
      showTooltip.value = false;
    }
  });

</script>

<style lang="sass">
.secret-answer
  background-color: #babdc8
</style>