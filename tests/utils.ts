import { mount, VueWrapper } from '@vue/test-utils'
import { Component } from 'vue'
import { createClient } from '@supabase/supabase-js'

export const createTestWrapper = (
  component: Component,
  options = {}
): VueWrapper<any> => {
  return mount(component, {
    global: {
      stubs: {
        'router-link': true,
        'router-view': true,
      },
      mocks: {
        $supabase: createClient('http://localhost', 'test-key'),
      },
    },
    ...options,
  })
}

export const mockSupabaseResponse = (data: any) => {
  return {
    data,
    error: null,
  }
}

export const mockSupabaseError = (error: any) => {
  return {
    data: null,
    error,
  }
}

export const createMockPlayer = (overrides = {}) => ({
  id: '1',
  name: 'Test Player',
  role: 'citizen',
  isAlive: true,
  ...overrides,
})

export const createMockGame = (overrides = {}) => ({
  id: '1',
  name: 'Test Game',
  status: 'waiting',
  players: [],
  ...overrides,
}) 