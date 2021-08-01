<template>
  <BaseLayout>
    <template v-slot:title>
      <div class="flex flex-col items-center">
        <div class="lg:w-1/2 sm:w-full">
          <SearchInput
            v-model="keyword"
            placeholder="Buscar en la web..."
            :onClick="search"
          />
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
import {ref} from 'vue'
import BaseLayout from '@/layouts'
import SearchInput from '@/components/SearchInput'
import ImageCard from '@/components/ImageCard'

import { fetchImages } from "../services";

export default {
  components: {
    BaseLayout,
    SearchInput,
    ImageCard
  },
  setup() {
    const images = ref([])

    return {
      images,
      keyword: ''
    }
  },
  methods: {
    search() {
      fetchImages(this.keyword, 3)
        .then(result => {
          console.log(result)
          this.images = result.map(r => {
            return {
              id: r.id,
              imageUrl: r.urls.regular,
              name: 'Samuel David',
              points: 12
            }
          })
        })
        .catch(e => console.error(e))
    }
  },
  computed: {
    resultsAmount() { return this.images.length }
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
