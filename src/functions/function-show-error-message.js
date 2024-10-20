import { Dialog, Loading } from 'quasar'
import { useSymbolsStore } from 'src/stores/symbolsStore'

export function showErrorMessage(errorMessage) {
  Loading.hide()
  const store = useSymbolsStore()
  let errorText
  let title

  if (store.lang.lang === 'Русский') {
    title = 'Ошибка'
    if (errorMessage === 'Firebase: Error (auth/invalid-credential).') {
      errorText = 'Некорректный Email или пароль'
    } else {
      errorText = errorMessage
    }
  } else {
    title = 'Error'
    if (errorMessage === 'Firebase: Error (auth/invalid-credential).') {
      errorText = 'Incorrect Email or password'
    } else {
      errorText = errorMessage
    }
  }

  Dialog.create({
    title: title,
    message: errorText,
  })
}
