<template>
  <ul>
    <div v-for="(seller, index) in sorted" :key="seller.id">
      <TransitionRoot
        show
        appear
        enter="transform ease-in duration-300 transition"
        enterFrom="-translate-x-10 opacity-0"
        enterTo="translate-y-0 opacity-100"
        :style="`transition-delay: ${100 + index * 100}ms`"
      >
        <li :class="['item', 'px-6 py-4 my-3']">
          <span class="info-text">{{ seller.name }}</span>
          <span class="info-text">{{ seller.points }} / {{ pointsToWin }}</span>
        </li>
      </TransitionRoot>
    </div>
  </ul>
</template>

<script>
import { TransitionRoot } from '@headlessui/vue'

export default {
  components: {
    TransitionRoot
  },
  props: {
    sellers: {
      type: Array,
      default: []
    },
    pointsToWin: [Number, String]
  },
  computed: {
    sorted() {
      return this.sellers.sort((a, b) => b.points - a.points);
    }
  }
}
</script>

<style scoped>
.item {
  @apply
    flex justify-between
    transition transform
    bg-white shadow overflow-hidden rounded-md
    hover:bg-gray-50 hover:-translate-y-0.5;
}
.info-text {
  @apply text-lg font-bold text-yellow-500;
}
</style>
