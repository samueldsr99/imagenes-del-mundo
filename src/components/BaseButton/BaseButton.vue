<template>
  <button :class="variant">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      validator(value) {
        return ['primary', 'secondary'].includes(value)
      },
      default: 'primary'
    }
  }
}
</script>

<style scoped>
button {
  @apply
    h-11 rounded-md shadow-lg
    font-bold text-xl
    transition duration-300
    focus:outline-none;
}
.primary {
  @apply
    text-yellow-500 bg-white
    hover:bg-yellow-400 hover:text-yellow-100;
}
.secondary {
  @apply
    bg-gray-700 text-white
    hover:bg-gray-800 hover:text-yellow-100;
}
</style>
