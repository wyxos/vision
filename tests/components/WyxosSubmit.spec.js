import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WyxosSubmit from '../../src/components/WyxosSubmit.vue'
import FormBuilder from '../../src/utilities/FormBuilder'

describe('WyxosSubmit', () => {
  it('renders with default text', () => {
    const mockForm = new FormBuilder()
    mockForm.state.loading = false
    mockForm.state.wasSubmitting = false

    const wrapper = mount(WyxosSubmit, {
      props: {
        form: mockForm
      }
    })
    expect(wrapper.text()).toBe('Submit')
  })

  it('renders with custom text using slot', () => {
    const mockForm = new FormBuilder()
    mockForm.state.loading = false
    mockForm.state.wasSubmitting = false

    const wrapper = mount(WyxosSubmit, {
      props: {
        form: mockForm
      },
      slots: {
        default: 'Save'
      }
    })
    expect(wrapper.text()).toBe('Save')
  })

  it('is disabled when form is submitting', async () => {
    const mockForm = new FormBuilder()
    mockForm.state.loading = true
    mockForm.state.wasSubmitting = true

    const wrapper = mount(WyxosSubmit, {
      props: {
        form: mockForm
      }
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.wyxos-submit-spinner').exists()).toBe(true)
  })

  it('is enabled when form is not submitting', async () => {
    const mockForm = new FormBuilder()
    mockForm.state.loading = false
    mockForm.state.wasSubmitting = false

    const wrapper = mount(WyxosSubmit, {
      props: {
        form: mockForm
      }
    })

    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    expect(wrapper.find('.wyxos-submit-spinner').exists()).toBe(false)
  })

  it('is disabled when disabled prop is true, regardless of form state', async () => {
    const mockForm = new FormBuilder()
    mockForm.state.loading = false
    mockForm.state.wasSubmitting = false

    const wrapper = mount(WyxosSubmit, {
      props: {
        form: mockForm,
        disabled: true
      }
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.wyxos-submit-spinner').exists()).toBe(false)
  })
})
