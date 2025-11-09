import createView from './view.js'
import validate from './validator.js'

const view = createView()
const form = view.getForm()

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const url = new FormData(e.target).get('url').trim()
  const feeds = view.getFeeds()

  try {
    await validate(url, feeds)
    view.setError(null)
    view.addFeed(url)
    view.resetForm()
  } catch (error) {
    view.setError(error.message)
  }
})