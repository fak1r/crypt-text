<template>
  <q-layout class="q-pa-md" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          CrypText
        </q-toolbar-title>
        <q-fab
          direction="down"
          padding="10px"
          unelevated
          class="lang-icon q-pr-sm"
          flip-horizontal
        >
        <template v-slot:icon="{ opened }">
          <q-icon
            size="40px"
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
        <svg
          @click="open('right')"
          class="secret-icon"
          fill="#ffff"
          height="40px"
          width="40px"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
        ><path d="M383.9 308.3l23.9-62.6c4-10.5-3.7-21.7-15-21.7h-58.5c11-18.9 17.8-40.6 17.8-64v-.3c39.2-7.8 64-19.1 64-31.7 0-13.3-27.3-25.1-70.1-33-9.2-32.8-27-65.8-40.6-82.8-9.5-11.9-25.9-15.6-39.5-8.8l-27.6 13.8c-9 4.5-19.6 4.5-28.6 0L182.1 3.4c-13.6-6.8-30-3.1-39.5 8.8-13.5 17-31.4 50-40.6 82.8-42.7 7.9-70 19.7-70 33 0 12.6 24.8 23.9 64 31.7v.3c0 23.4 6.8 45.1 17.8 64H56.3c-11.5 0-19.2 11.7-14.7 22.3l25.8 60.2C27.3 329.8 0 372.7 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-48.4-25.8-90.4-64.1-114.1zM176 480l-41.6-192 49.6 32 24 40-32 120zm96 0l-32-120 24-40 49.6-32L272 480zm41.7-298.5c-3.9 11.9-7 24.6-16.5 33.4-10.1 9.3-48 22.4-64-25-2.8-8.4-15.4-8.4-18.3 0-17 50.2-56 32.4-64 25-9.5-8.8-12.7-21.5-16.5-33.4-.8-2.5-6.3-5.7-6.3-5.8v-10.8c28.3 3.6 61 5.8 96 5.8s67.7-2.1 96-5.8v10.8c-.1.1-5.6 3.2-6.4 5.8z"/></svg>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="left-menu"
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <q-dialog v-model="dialog" :position="position">
          <q-card style="width: 240px">
            <q-card-section class="row items-center no-wrap right-menu">
              <KeyboardTextarea></KeyboardTextarea>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>

      <CryptDecrypt></CryptDecrypt>
      <Keyboard-symbols></Keyboard-symbols>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  
  import { ref, watch } from 'vue'
  import KeyboardSymbols from 'src/components/KeyboardSymbols.vue';
  import KeyboardTextarea from 'src/components/KeyboardTextarea.vue';
  import CryptDecrypt from 'src/components/CryptDecrypt.vue';
  import { useQuasar } from 'quasar'
  import languages from 'src/lang/index'
  import { useSymbolsStore } from 'src/stores/symbolsStore'

  const store = useSymbolsStore();
  const leftDrawerOpen = ref(false);

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const dialog = ref(false)
  const position = ref('top')

  const open = (pos) => {
    position.value = pos
    dialog.value = true
  }

  // переключение языка
  let lang = ref(languages['en-US']);

  const $q = useQuasar();

  if ($q.lang.getLocale() === 'ru-RU'){
    lang.value = languages['ru-RU'];
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
  })
  
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
.secret-icon
  cursor: pointer
  &:hover
    fill: $primary-light
  &:active
    fill: #afa9b8
.lang-icon
  &:hover
    color: $primary-light
  @media screen and (max-width: 500px) 
    &:hover
      color: #ffff
  &:active
    color: #afa9b8
.q-btn--fab
  .q-ripple 
    display: none
.q-focus-helper
  display: none
</style>
