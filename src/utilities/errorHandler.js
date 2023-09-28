import { useProgrammatic } from '@oruga-ui/oruga-next'
import axios from 'axios'
import SessionExpired from '../components/WyxosSessionExpired.vue'
import TokenExpired from '../components/WyxosTokenExpired.vue'

export default async function errorHandler(error, options) {
  const errors = {
    401: 'Authentication required. Please reload the page and sign in.',
    403: 'You do not have permission to perform this action.',
    404: 'The page or action you are looking for could not be found.',
    419: 'Your session has likely expired. Try again or reload the page.',
    422: 'The action attempted was invalid. Please review your input and try again.',
    500: 'An unexpected error has occurred. This issue has been reported.',
    503: 'The site is currently under maintenance. Please try again later.'
  }

  Object.assign(errors, options?.messages || {})

  const message = errors[error.response?.status] || errors[500]

  const { oruga } = useProgrammatic()

  oruga.notification.open({
    message,
    duration: 1000 * 5,
    variant: 'danger',
    position: 'bottom-right',
    closable: true
  })

  if (error.response?.status === 419) {
    oruga.modal.open({
      component: TokenExpired,
      trapFocus: true,
      closable: false
    })

    const response = await axios.get('/heartbeat')

    // Update CSRF token in your client application
    const csrfToken = response.data.csrfToken
    // Update the CSRF token in Axios or whatever you use for requests
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
  }

  if (error.response?.status === 401) {
    oruga.modal.open({
      component: options.components?.SessionExpired || SessionExpired,
      trapFocus: true,
      closable: false
    })
  }

  if (error.response?.status === 422) {
    new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
      const element = document.querySelector('.o-field__label-danger')

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  return Promise.reject(error)
}
