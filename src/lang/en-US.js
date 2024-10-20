export default {
  lang: 'English',

  // MenuLinks.vue
  mainPage: 'Main page',
  loginRegistration: 'Login / Registration',
  logout: 'Logout',

  // CryptDecrypt.vue
  cryptTitle: 'Encryption and decryption text',
  cryptText: 'Be sure to enter text using the keys contained in the secret key.',

  btnCrypt: 'Encrypt',
  btnDecrypt: 'Decrypt',
  btnClear: 'Clear',
  btnCopy: 'Copy',
  btnShowResult: 'Show result',
  copyTooltip: 'Done!',
  popupCryptTitle: 'Encrypted text',
  popupDecryptTitle: 'Decrypted text',
  labelCrypt: 'Text to encrypt',
  labelDecrypt: 'Secret code',
  authAlert:
    'Log in to be able to store your keys on the server and try out all the functionality of the application. Registration does not require email verification, you can specify any anonymous mailbox',

  // KeyboardBuilder.vue
  builderTitle: 'Encryption key builder',
  builderText:
    'Select the key and character to replace. Repeated characters are prohibited on the keyboard, this is necessary for correct decryption.',
  builderKeyboard: 'Keyboard:',
  hideKey: 'Hide key',
  showKey: 'Show key',
  builderSymbols: 'Symbols:',
  builderChooseWarning: 'Repeated symbol',
  builderChooseNewSymbol: 'Choose symbol to add',
  builderChooseOldSymbol: 'Choose symbol to remove',
  btnSaveKey: 'Create new key',
  labelNewKeyboard: 'Keyboard name',
  emptyKey: 'Not selected',
  randomizeKey: 'Randomize key',

  // LangLayoutSelector.vue
  langSelectorLable: 'Current key',
  langSelectorKeys: ['English', 'Russian'],

  // KeyList.vue
  keyListTitle: 'Key list',
  keyListText: 'You can add, remove and edit keys here. Duplicate key name is not allowed',
  repeatedKey: 'Duplicate key name is not allowed',
  deleteKeyNotice: 'Are you sure you want to delete the key?',
  editKeyNotice: 'New key name',
  btnSaveOnServer: 'Save key on server',
  newKeyNameValidation: 'Enter a unique key name',

  // LoginRegister.vue
  registerInfo: 'Registered users can save keys in their account.',
  loginInfo: 'Log in to view your saved keys.',
  registerBtn: 'Registration',
  loginBtn: 'Login',
  registerEmailValidation: 'Enter a valid email address',
  registerPassValidation: 'Password at least 6 characters long',
  email: 'Email',
  password: 'Password',

  // AuthPage.vue
  login: 'Login',
  registration: 'Registration',

  // MainLayout.vue
  menuTitle: 'Menu',
  menuKey: 'Key',

  // symbolsStore.js
  alertSaveOnServer: 'Key was successfully saved to the server',
  alertDeleteFromServer: 'Key was successfully deleted',
  alertNameChanged: 'Key name changed',
}
