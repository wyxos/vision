import { useProgrammatic } from '@oruga-ui/oruga-next'

export default function success(message) {
  const { oruga } = useProgrammatic()

  oruga.notification.open({
    message: message || 'Action successful.',
    duration: 2500,
    variant: 'success',
    position: 'bottom-right',
    closable: true
  })
}
