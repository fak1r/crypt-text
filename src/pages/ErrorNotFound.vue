<template>
  <div class="fullscreen bg-deep-purple-5 text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn class="q-mt-xl" color="white" text-color="deep-purple-5" unelevated to="/" label="Go Home" no-caps />
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'ErrorNotFound',
})
</script>
