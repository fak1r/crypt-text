export default {
  lang: 'Русский',

  // MenuLinks.vue
  mainPage: 'Главная страница',
  loginRegistration: 'Вход / Регистрация',
  logout: 'Выход',

  // CryptDecrypt.vue
  cryptTitle: 'Шифрование и дешифровка текста',
  cryptText: 'Обязательно вводите текст, используя клавиши, содержащиеся в секретном ключе.',

  btnCrypt: 'Шифровать',
  btnDecrypt: 'Дешифровать',
  btnClear: 'Очистить',
  btnCopy: 'Копировать',
  btnShowResult: 'Результат',
  copyTooltip: 'Успех!',
  popupCryptTitle: 'Зашифрованный текст',
  popupDecryptTitle: 'Дешифрованный текст',
  labelCrypt: 'Текст для шифрования',
  labelDecrypt: 'Секретный код',
  authAlert:
    'Авторизуйтесь, чтобы иметь возможность хранить ключи на сервере и попробовать весь функционал приложения. Регистрация не требует верификации Email, можно указать любой анонимный ящик',

  // KeyboardBuilder.vue
  builderTitle: 'Конструктор ключей шифрования',
  builderText:
    'Выберите клавишу и символ для замены. Повторные символы в клавиатуре запрещены, это нужно для корректной дешифровки.',
  builderKeyboard: 'Клавиатура:',
  hideKey: 'Скрыть ключ',
  showKey: 'Показать ключ',
  builderSymbols: 'Символы:',
  builderChooseWarning: 'Повторный символ',
  builderChooseNewSymbol: 'Выберите новый символ',
  builderChooseOldSymbol: 'Выберите символ для замены',
  btnSaveKey: 'Создать новый ключ',
  labelNewKeyboard: 'Название клавиатуры',
  emptyKey: 'Не выбрана',
  randomizeKey: 'Перемешать ключ',

  //LangLayoutSelector.vue
  langSelectorLable: 'Выбранный ключ',
  langSelectorKeys: ['Английский', 'Русский'],

  // KeyList.vue
  keyListTitle: 'Список ключей',
  keyListText: 'Здесь вы можете добавить, редактировать или удалить ключи. Нельзя указывать одинаковые имена ключей',
  repeatedKey: 'Нельзя указывать одинаковые имена ключей',
  deleteKeyNotice: 'Вы уверены что хотите удалить ключ?',
  editKeyNotice: 'Новое имя ключа',
  btnSaveOnServer: 'Сохранить ключ на сервер',
  newKeyNameValidation: 'Введите уникальное имя ключа',

  // LoginRegister.vue
  registerInfo: 'Зарегистрированные пользователи могут сохранять ключи в своём аккаунте.',
  loginInfo: 'Авторизуйтесь, чтобы просматривать сохранённые ключи.',
  registerBtn: 'Регистрация',
  loginBtn: 'Вход',
  registerEmailValidation: 'Введите действительный Email',
  registerPassValidation: 'Пароль длиной не менее 6 символов',
  email: 'Email адрес',
  password: 'Пароль',

  // AuthPage.vue
  login: 'Вход',
  registration: 'Регистрация',

  // MainLayout.vue
  menuTitle: 'Меню',
  menuKey: 'Ключ',

  // symbolsStore.js
  alertSaveOnServer: 'Ключ успешно сохранён на сервер',
  alertDeleteFromServer: 'Ключ успешно удалён',
  alertNameChanged: 'Имя ключа изменено',
}
