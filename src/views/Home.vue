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
        <ImageCard
          v-for="image in images" :key="image.id"
          :name="image.name"
          :points="image.points"
          :imageUrl="image.imageUrl"
        />
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/layouts'
import SearchInput from '@/components/SearchInput'
import ImageCard from '@/components/ImageCard'

const images = [
  {
    id: 1,
    name: 'John Doe',
    points: 12,
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
  },
  {
    id: 2,
    name: 'Thomas Thompson',
    points: 17,
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
  },
  {
    id: 3,
    name: 'Chloe Mountain',
    points: 3,
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
  },
]

export default {
  components: {
    BaseLayout,
    SearchInput,
    ImageCard
  },
  setup() {
    return { images }
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
