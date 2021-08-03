<template>
  <div class="w-full border rounded-md shadow-xl px-4 py-5">
    <div class="text-green-500 font-bold text-2xl md:text-4xl mb-10">
      Factura de Alegra
    </div>
    <pre class="text-yellow-500 border py-2 px-2 overflow-x-scroll">{{ data }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
}
</script>
