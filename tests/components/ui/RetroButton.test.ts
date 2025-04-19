import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RetroButton from '@/components/ui/RetroButton.vue'

describe('RetroButton', () => {
  test('renders with default props', () => {
    const wrapper = mount(RetroButton, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('bg-[#0095ff]')
  })

  test('applies correct classes for different types', () => {
    const types = ['primary', 'secondary', 'danger'] as const
    const expectedClasses = {
      primary: 'bg-[#0095ff]',
      secondary: 'bg-[#00ff00]',
      danger: 'bg-[#ff0000]',
    }

    types.forEach((type) => {
      const wrapper = mount(RetroButton, {
        props: { type },
      })
      expect(wrapper.classes()).toContain(expectedClasses[type])
    })
  })

  test('handles disabled state', () => {
    const wrapper = mount(RetroButton, {
      props: { disabled: true },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('disabled:bg-[#666666]')
  })

  test('handles loading state', () => {
    const wrapper = mount(RetroButton, {
      props: { loading: true },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  test('renders icon slot', () => {
    const wrapper = mount(RetroButton, {
      slots: {
        icon: '<span class="icon">★</span>',
        default: 'Click me',
      },
    })
    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.text()).toContain('Click me')
  })
}) 