<template>
  <q-layout class="q-pa-md" view="lHr lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn class="left-menu-btn" dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          CrypText
        </q-toolbar-title>

        <q-fab
          direction="down"
          padding="10px"
          unelevated
          class="lang-icon"
          flip-horizontal
        >
        <template v-slot:icon="{ opened }">
          <q-icon
            size="36px"
            class="absolute-center"
            :class="{ 'example-fab-animate--hover': opened !== true }"
            name="language"
          />
        </template>
          <div class="q-pr-sm">
            <q-fab-action color="primary" text-color="white" @click="lang = 'en-US'" label="ENG" />
            <q-fab-action color="primary" text-color="white" @click="lang = 'ru-RU'" label="RUS" />
          </div>
        </q-fab>

        <svg class="key-icon" @click="toggleRightDrawer" fill="#FFF" xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36"><path d="M420-360h120l-23-129q20-10 31.5-29t11.5-42q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 23 11.5 42t31.5 29l-23 129Zm60 280q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      show-if-above
      class="left-menu"
    >
      <q-list>
        <q-item-label
          header
        >
          {{ store.lang.menuTitle }}
        </q-item-label>
        <q-list>
          <menu-links />
        </q-list>
      </q-list>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      show-if-above
      class="right-menu"
      :width="200"
    >
      <q-item-label
        header
      >
        {{ store.lang.menuKey }}
      </q-item-label>
      <div class="keyboard-textarea">
        <keyboard-textarea></keyboard-textarea>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
  
  import { ref, watch } from 'vue'
  import KeyboardTextarea from 'src/components/KeyboardTextarea.vue';
  import MenuLinks from 'src/components/MenuLinks.vue';
  import { useQuasar } from 'quasar'
  import languages from 'src/lang/index'
  import { useSymbolsStore } from 'src/stores/symbolsStore'
  
  const store = useSymbolsStore();
  const leftDrawerOpen = ref(false);
  const rightDrawerOpen = ref(false);

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
  const toggleRightDrawer = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value
  }

  // Переключение языка
  
  let lang = ref(languages['ru-RU']);

  const $q = useQuasar();

  if ($q.lang.getLocale() === 'en-US'){
    lang.value = languages['en-US'];
  }

  store.lang = lang.value;

  watch(lang, (newLang) => {
    if (newLang === 'ru-RU'){
      lang.value = languages['ru-RU'];
      store.lang = lang.value;
    } else if (newLang === 'en-US'){
      lang.value = languages['en-US'];
      store.lang = lang.value;
    }
  });
  
</script>

<style lang="sass">
body
  background-color: #eff0f3
.parent-container
  width: 100%
  display: flex
  justify-content: center
.child-container
  width: 950px
@media screen and (max-width: 420px) 
  .q-toolbar
    padding: 0 10px
  .q-pa-md 
    padding: 10px 10px
  .q-pr-sm 
    padding: 0 2px
.h1
  font-size: 28px
  font-weight: bold
  @media screen and (max-width: 850px) 
    font-size: 20px
.h2
  font-size: 23px
  font-weight: bold

  @media screen and (max-width: 1000px) 
    font-size: 22px
  @media screen and (max-width: 475px) 
    font-size: 21px
  @media screen and (max-width: 455px) 
    font-size: 20px
  @media screen and (max-width: 430px) 
    font-size: 19px
  @media screen and (max-width: 410px) 
    font-size: 18px
  @media screen and (max-width: 400px) 
    font-size: 17px
  @media screen and (max-width: 380px) 
    font-size: 16px
  @media screen and (max-width: 365px) 
    font-size: 15px
  @media screen and (max-width: 345px) 
    font-size: 14px
  @media screen and (max-width: 330px) 
    font-size: 13px
  @media screen and (max-width: 310px) 
    font-size: 12px
  @media screen and (max-width: 300px) 
    font-size: 11px
  @media screen and (max-width: 265px) 
    font-size: 10px
.left-menu, .right-menu
  background-color: $primary-light
.lang-icon
  @media (hover: none) and (pointer: coarse)
    &:hover
      color: $primary-light
  &:active
    color: #AAA
.key-icon
  cursor: pointer
  @media (hover: none) and (pointer: coarse)
    &:hover
      fill: $primary-light
  &:active
    fill: #AAA
.left-menu-btn
  @media (hover: none) and (pointer: coarse)
    &:hover
      color: $primary-light
  &:active
    color: #AAA
  .q-ripple 
    display: none
.q-btn--fab
  .q-ripple 
    display: none
.q-focus-helper
  display: none
.btn 
  height: 40px
  padding: 5px 10px
  background-color: #ff8e3c 
  color: #0d0d0d 
  font-weight: bold
  font-size: 1em
  border: none
  border-radius: 4px
  padding: 10px 20px
  cursor: pointer
  transition: background-color 0.3s ease 
  @media (max-width: 360px)
    padding: 4px 8px
  &:active 
    background-color: #d71b1b 
    @media (hover: none) and (pointer: coarse)
    &:hover
      background-color: #d9376e 
  &:disabled 
    background-color: #ccc 
    cursor: not-allowed
.input
  width: 100%
.keyboard-textarea
  display: flex
  justify-content: center
</style>
