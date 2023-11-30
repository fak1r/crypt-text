<template>
  <q-layout class="q-pa-md" view="lHr lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
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

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
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
          Menu
        </q-item-label>
        <q-list>
          <MenuLinks
            v-for="link in linksList"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
        <keyboards-list></keyboards-list>
      </q-list>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      show-if-above
      class="right-menu"
      :width="160"
    >
      <q-item-label
        header
      >
        Key
      </q-item-label>
      <div class="keyboard-textarea">
        <KeyboardTextarea></KeyboardTextarea>
      </div>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <q-dialog v-model="dialog" :position="position">
          <q-card style="width: 240px">
            <q-card-section class="row items-center no-wrap right-menu">

            </q-card-section>
          </q-card>
        </q-dialog>
      </div>

      <CryptDecrypt></CryptDecrypt>
      <Keyboard-Builder></Keyboard-Builder>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
  
  import { ref, watch } from 'vue'
  import KeyboardBuilder from 'src/components/KeyboardBuilder.vue';
  import KeyboardTextarea from 'src/components/KeyboardTextarea.vue';
  import KeyboardsList from 'src/components/KeyboardsList.vue';
  import CryptDecrypt from 'src/components/CryptDecrypt.vue';
  import MenuLinks from 'src/components/MenuLinks.vue';
  import { useQuasar } from 'quasar'
  import languages from 'src/lang/index'
  import { useSymbolsStore } from 'src/stores/symbolsStore'

  const store = useSymbolsStore();
  const leftDrawerOpen = ref(false);
  const rightDrawerOpen = ref(false)

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
  const toggleRightDrawer = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value
  }
  const dialog = ref(false)
  const position = ref('top')

  const open = (pos) => {
    position.value = pos
    dialog.value = true
  }

  const linksList = [
    {
      title: 'Login / Registration',
      icon: 'login',
      link: '/'
    },
    {
      title: 'Logout',
      icon: 'logout',
      link: '/'
    },
    {
      title: 'Github',
      caption: 'github.com/fak1r/crypt-text',
      icon: 'code',
      link: 'https://github.com/fak1r/crypt-text'
    }
  ]

  // Переключение языка
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
.lang-icon
  &:active
    color: #afa9b8
  @media (hover: hover) 
    &:hover
      color: $primary-light
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
  @media (hover: hover)
    &:hover
      background-color: #d9376e 
  &:disabled 
    background-color: #ccc 
    cursor: not-allowed
.keyboard-textarea
  display: flex
  justify-content: center
</style>
