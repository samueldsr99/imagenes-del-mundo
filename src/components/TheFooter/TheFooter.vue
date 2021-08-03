<template>
  <div class="w-full bg-gray-800 py-4">
    <span class="font-bold flex items-center justify-center gap-2 text-gray-600">
      <CodeIcon class="w-4 h-4 text-gray-400" />
      with
      <HeartIcon class="w-4 h-4 text-gray-400" />
      in
      <span class="inline-flex items-center">
        <img class="w-4 h-4" src="@/assets/logo.png" />ue
      </span>
    </span>
  </div>
</template>

<script>
import { CodeIcon } from '@heroicons/vue/outline'
import { HeartIcon } from '@heroicons/vue/solid'
export default {
  components: {
    CodeIcon,
    HeartIcon
  }
}
</script>