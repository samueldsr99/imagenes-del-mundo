<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="bg-gray-800 z-0" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="items-container">
          <router-link class="flex-shrink-0 flex items-center" to="/">
            <CodeIcon class="block h-8 w-auto" />
          </router-link>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium'
                ]"
                :aria-current="item.current ? 'page' : undefined"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="menu-container">
          <DisclosureButton class="menu-button">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>
    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium'
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { ref } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  MenuButton
} from '@headlessui/vue'
import {
  BellIcon,
  MenuIcon,
  XIcon,
  CodeIcon
} from '@heroicons/vue/outline'

const navigation = [
  { name: 'Inicio', href: '/', current: true },
  { name: 'Opciones', href: '/options', current: false },
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MenuButton,
    BellIcon,
    MenuIcon,
    XIcon,
    CodeIcon,
  },
  setup() {
    const open = ref(false)

    return {
      navigation,
      open,
    }
  },
}
</script>

<style scoped>
.menu-button {
  @apply
    sm:hidden
    inline-flex items-center
    justify-center p-2 rounded-md
    text-gray-400
    hover:text-white hover:bg-gray-700
    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white;
}
.menu-container {
  @apply
    sm:static sm:inset-auto sm:ml-6 sm:pr-0
    absolute inset-y-0 right-0 flex items-center pr-2;
}
.items-container {
  @apply flex-1 flex items-center justify-center sm:items-stretch sm:justify-start;
}
</style>
