<template>
  <q-item
    clickable
    tag="a"
    :to="link"
    v-if="props.link.length < 15"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ store.lang.lang === 'English' ? titleEng : titleRus }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>

  <!-- Если ссылка ведёт на внешний сайт -->
  <q-item
    clickable
    tag="a"
    :href="link"
    v-else
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ store.lang.lang === 'English' ? titleEng : titleRus }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>

  import { useSymbolsStore } from 'src/stores/symbolsStore';
  const store = useSymbolsStore();

  const props = defineProps({
    titleEng: {
      type: String,
    },

    titleRus: {
      type: String,
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  })
</script>
