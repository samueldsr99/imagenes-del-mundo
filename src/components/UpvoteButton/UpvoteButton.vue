<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
.button {
  @apply
    w-full h-11 rounded-md shadow-lg
    text-yellow-500 bg-white
    font-bold text-xl
    transition duration-300
    focus:outline-none hover:bg-yellow-400 hover:text-yellow-100;
}
</style>
