<template>
  <div class="images-container">
    <div v-for="seller in sellers" :key="seller.id">
      <Skeleton v-if="loading" />
      <div v-if="seller.imageUrl" class="relative flex flex-col items-center">
        <ImageCard
          radioName="contest-images"
          :id="seller.id"
          :name="seller.name"
          :points="seller.points + (seller.selected ? 3 : 0)"
          :pointsToWin="20"
          :imageUrl="seller.imageUrl"
          :value="`${seller.id}`"
          :selected="selected === seller.id"
          :onChange="handleSelect"
        />
        <div
          v-if="selected === seller.id"
          class="w-44 absolute top-1/3"
        >
          <TransitionRoot
            show
            appear
            enter="transform ease-in duration-300 transition"
            enterFrom="scale-75 opacity-0"
            enterTo="scale-100 opacity-100 "
          >
            <BaseButton class="w-full" @click="handleUpvote">Votar</BaseButton>
          </TransitionRoot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TransitionRoot } from '@headlessui/vue'

import ImageCard from '@/components/ImageCard'
import Skeleton from '@/components/Skeleton'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'ImagesContainer',
  components: {
    ImageCard,
    Skeleton,
    BaseButton,
    TransitionRoot
  },
  props: {
    sellers: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: false
    },
    selected: Number,
    handleSelect: Function,
    handleUpvote: Function
  }
}
</script>

<style scoped>
.images-container {
  @apply
    grid grid-cols-1 gap-y-4
    sm:grid-cols-2 sm:gap-x-2
    lg:grid-cols-3 lg:gap-x-3 lg:gap-y-3;
}
</style>
