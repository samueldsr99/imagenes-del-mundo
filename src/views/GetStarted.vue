<template>
  <main class="min-h-screen bg-cover bg-top sm:bg-top">
    <div class="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
      <TransitionRoot
        show
        appear
        enter="transform ease-in-out duration-700 transition"
        enterFrom="translate-y-10 opacity-0"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      >
        <span class="mt-2 text-5xl font-extrabold text-gray-800 tracking-tight sm:text-7xl">
          Bienvenido
        </span>
      </TransitionRoot>
      <TransitionRoot show appear
        enter="transform ease-in-out duration-700 transition"
        enterFrom="translate-y-10 opacity-0"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        :style="`transition-delay: 300ms`"
      >
        <p class="mt-6 text-xl sm:text-3xl font-medium text-gray-700">
          Imágenes del mundo
        </p>
      </TransitionRoot>
      <TransitionRoot show appear
        enter="transform ease-in-out duration-700 transition"
        enterFrom="translate-y-10 opacity-0"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        :style="`transition-delay: 400ms`"
      >
        <p class="mt-2 text-lg sm:text-xl font-medium text-gray-500">
          Las mejores imágenes de la web.
        </p>
      </TransitionRoot>
      <router-link to="/contest">
        <BaseButton variant="secondary" class="w-44 mt-10 transform hover:scale-110">Comenzar</BaseButton>
      </router-link>
    </div>
  </main>
</template>

<script>
import { TransitionRoot } from '@headlessui/vue'
import BaseButton from '@/components/BaseButton'

export default {
  components: {
    TransitionRoot,
    BaseButton
  }
}
</script>

<style scoped>
main {
  background-image: url('https://images.unsplash.com/photo-1551708919-09edea10f684?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80');
}
</style>
