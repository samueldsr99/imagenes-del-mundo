<template>
  <div class="h-full pb-10">
    <TheNavbar />
    <div class="mt-20 w-full flex flex-col items-center mb-2">
      <div class="w-11/12">
        <slot name="title"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
  <TheFooter />
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'Layout',
  props: ['variant'],
  components: {
    TheNavbar,
    TheFooter
  }
}
</script>

<style scoped>
.content {
  @apply
    mt-20 w-11/12 px-4 py-6
    bg-gray-50
    rounded-md;
}
</style>
