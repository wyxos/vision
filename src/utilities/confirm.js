import { useProgrammatic } from '@oruga-ui/oruga-next'
import WyxosPrompt from "../components/WyxosPrompt.vue";

export default async function confirm(props = {}) {
  const { oruga } = useProgrammatic()

  const instance = oruga.modal.open({
    component: WyxosPrompt,
    props: Object.assign(
      {
        title: 'Confirm',
        message: 'Are you sure you want proceed?',
        confirmText: 'Yes',
        cancelText: 'Cancel'
      },
      props
    ),
    trapFocus: true
  })

  const result = await instance.promise

  return result.action
}
