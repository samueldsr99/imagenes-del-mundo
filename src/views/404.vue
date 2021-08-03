<template>
  <main class="min-h-screen bg-cover bg-top sm:bg-top">
    <div class="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
      <p class="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">404</p>
      <h1 class="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Oops! Parece que estás perdido.</h1>
      <p class="mt-2 text-lg font-medium text-black text-opacity-50">No te preocupes, te ayudaremos a regresar.</p>
      <div class="mt-6">
        <router-link to="/" class="border border-transparent">
          <BaseButton variant="secondary" class="flex items-center px-4 mx-auto gap-2">
            <ArrowLeftIcon class="w-4 h-4" /> Ir a casa
          </BaseButton>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { ArrowLeftIcon } from '@heroicons/vue/outline'

export default {
  components: {
    BaseButton,
    ArrowLeftIcon
  }
}
</script>

<style scoped>
main {
  background-image: url('https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75');
}
</style>