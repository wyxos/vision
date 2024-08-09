import { useOruga } from '@oruga-ui/oruga-next'

export default function success(message) {
  const { oruga } = useOruga()

  oruga.notification.open({
    message: message || 'Action successful.',
    duration: 2500,
    variant: 'success',
    position: 'bottom-right',
    closable: true
  })
}
