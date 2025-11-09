import { object, string, setLocale} from 'yup'
import i18n from './i18n.js'

const validate = (url, feeds) => {
  setLocale({
    string: {
      url: () => ({key: 'invalidURL'}),
      required: () => ({key: 'emptyString'}),
    },
    mixed: {
      notOneOf: () => ({key: 'existRSS'}),
    },
  })

  const schema = object({
    url: string()
      .url()
      .required()
      .notOneOf(feeds)
  })

  return schema.validate({ url })
    .catch((error) => {
      throw new Error(i18n.t(error.message.key))
    })  
}

export default validate

