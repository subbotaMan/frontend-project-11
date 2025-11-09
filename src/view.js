import onChange from 'on-change'
import i18n from './i18n'

export default () => {
  // Элементы страницы
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
  }

  const state = onChange({
    feeds: [],
    error: null,
  }, (path, value) => {
    if (path === 'error') {
      const text = value ? i18n.t(value) : ''
      elements.feedback.textContent = text
      // Добавляю класс в случае ошибки
      elements.input.classList.toggle('is-invalid', !!value)
    }
  })


  return {
    // Геттеры
    getForm: () => elements.form,
    getFeeds: () => state.feeds,
    // Изменение состояния
    setError: (error) => { state.error = error },
    addFeed: (url) => { state.feeds.push(url) },
    // Перезагрузка формы
    resetForm: () => {
      elements.input.value = ''
      elements.input.focus()
      state.error = null
      elements.input.classList.remove('is-invalid')
    },
  }
}