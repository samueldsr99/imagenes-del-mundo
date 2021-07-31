<template>
  <BaseLayout>
    <template v-slot:title>
      <div class="flex flex-col items-center">
        <div class="lg:w-1/2 sm:w-full">
          <SearchInput placeholder="Buscar en la web..." />
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="images-container">
        <ImageCard />
        <ImageCard />
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/layouts'
import SearchInput from '@/components/SearchInput'
import ImageCard from '@/components/ImageCard'

export default {
  components: {
    BaseLayout,
    SearchInput,
    ImageCard
  }
}
</script>

<style scoped>
.images-container {
  @apply
    grid grid-cols-1
    sm:grid-cols-2 sm:gap-x-2
    lg:grid-cols-3 lg:gap-x-3;
}
</style>