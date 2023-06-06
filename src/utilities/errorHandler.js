import { useProgrammatic } from '@oruga-ui/oruga-next'
// import SessionExpired from '@laravel/components/SessionExpired.vue'

export default function errorHandler(error, messages = {}) {
  const errors = {
    401: 'Authentication required. Please reload the page and sign in.',
    403: 'You do not have permission to perform this action.',
    404: 'The page or action you are looking for could not be found.',
    419: 'Your session has likely expired. Please reload the page and try again.',
    422: 'The action attempted was invalid. Please review your input and try again.',
    500: 'An unexpected error has occurred. This issue has been reported.',
    503: 'The site is currently under maintenance. Please try again later.'
  }

  Object.assign(errors, messages)

  const message = errors[error.response?.status] || errors[500]

  const { oruga } = useProgrammatic()

  oruga.notification.open({
    message,
    duration: 2500,
    variant: 'danger',
    position: 'bottom-right',
    closable: true
  })

  // if(error.response?.status === 401){
  //   oruga.modal.open({
  //     component: SessionExpired,
  //     trapFocus: true
  //   })
  // }
  if (process.env.NODE_ENV === 'test') {
    // Silently consume the error in test mode.
    console.error('silent error', error)
  } else {
    // Re-throw the error in non-test mode.
    throw error
  }
}
