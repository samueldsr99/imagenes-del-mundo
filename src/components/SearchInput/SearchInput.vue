<template>
  <div class="container">
    <input
      spellcheck="false"
      type="text"
      class="input"
      v-model="model"
      @keypress="onPressEnter"
      v-bind="$attrs"
    />
    <div class="absolute inset-y-0 right-0 flex items-center">
      <button class="search-button" @click="onClick">
        <SearchIcon class="w-5 h-5 text-gray-400" />
      </button>
    </div>
  </div>
</template>

<script>
import { SearchIcon } from '@heroicons/vue/solid'

export default {
  name: 'SearchInput',
  components: { SearchIcon },
  inheritAttrs: false,
  props: {
    onClick: {
      type: Function,
      default: function() {}
    },
    model: String
  },
  methods: {
    onPressEnter(key) {
      key.code === 'Enter' && this.onClick()
    }
  }
}
</script>

<style scoped>
.container {
  @apply relative rounded-md shadow-sm;
}
.search-button {
  @apply
    w-16 h-full
    flex items-center justify-center;
}
.input {
  @apply
    h-16
    placeholder-gray-400
    font-medium
    block w-full pl-7 pr-12 rounded-md
    lg:text-xl sm:text-sm
    transition duration-500 ease-in-out
    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300;
}
</style>
