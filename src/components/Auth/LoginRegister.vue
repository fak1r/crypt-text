<template>
  <form  @submit.prevent="submitForm">
    <div class="row">
      <q-banner class="banner">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab === 'regis' ? store.lang.registerInfo : store.lang.loginInfo }}    
      </q-banner>
    </div>
    <div class="row q-mt-md">
      <q-input
        class="input"
        v-model="email"
        color="deep-purple-5"
        :label="store.lang.email"
        outlined
        @keyup.esc="email = ''"
        ref="emailRef"
        :rules="[ val => isValidEmailAdress(val) || store.lang.registerEmailValidation]"
        lazy-rules
      />
    </div>
    <div class="row q-mt-md">
      <q-input
        class="input"
        v-model="password"
        color="deep-purple-5"
        :label="store.lang.password"
        :type="isPwd ? 'password' : 'text'"
        outlined
        @keyup.esc="password = ''"
        ref="passwordRef"
        :rules="[ val => val.length >= 6 || store.lang.registerPassValidation]"
        lazy-rules
      >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
      </q-input>
    </div>
    <div class="row q-mt-md">

    </div>
    <div class="row q-mt-md">
      <q-space />
      <q-btn
        color="primary"
        class="btn"
        no-caps
        type="submit"
      >{{ tab === 'regis' ? store.lang.registerBtn : store.lang.loginBtn }}
      </q-btn>
    </div>
  </form>
</template>

<script setup>

  import { useSymbolsStore } from 'src/stores/symbolsStore';
  import { ref } from 'vue'; 

  const store = useSymbolsStore();

  const props = defineProps({
    tab: {
      type: String,
      required: true,
      default: 'regis'
    },
  })

  const email = ref('');
  const password = ref('');
  const emailRef = ref(null);
  const passwordRef = ref(null);
  const isPwd = ref(true);

  const submitForm = () => {
    emailRef.value.validate();
    passwordRef.value.validate();
    if (!emailRef.value.hasError && !passwordRef.value.hasError){
      if (props.tab === 'login'){
        console.log('login');
      } else {
        console.log('register');
      }
    }
  }

  const isValidEmailAdress = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  } 
</script>

<style lang="sass">
.banner
  background-color: $primary-light
  
</style>