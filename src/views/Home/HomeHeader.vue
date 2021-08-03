<template>
  <div class="flex justify-between">
    <h1 class="text-xl" v-if="finished">
      El concurso ha terminado!<br /> Muchas felicidades a
      <strong class="text-yellow-500">{{ winnerName }}</strong>
    </h1>
    <div class="flex justify-end gap-3">
      <BaseButton
        variant="secondary"
        class="float-right w-11"
        @click="handleCleanPoints()"
      >
        <RefreshIcon class="h-6 w-6 mx-auto" />
      </BaseButton>
      <BaseButton
        variant="secondary"
        class="float-right w-11"
        @click="cleanImages()"
      >
        <UserGroupIcon class="h-6 w-6 mx-auto" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import { UserGroupIcon, RefreshIcon } from '@heroicons/vue/outline'

export default {
  components: {
    BaseButton,
    UserGroupIcon,
    RefreshIcon
  },
  props: {
    handleCleanPoints: Function,
    cleanImages: Function,
    finished: {
      type: Boolean,
      default: false
    },
    winnerName: String
  }
}
</script>