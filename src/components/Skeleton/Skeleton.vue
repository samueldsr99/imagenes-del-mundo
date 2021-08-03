<template>
  <SkeletonImage v-if="variant === 'image'" />
  <SkeletonDocument v-else-if="variant === 'document'" />
</template>

<script>
import SkeletonImage from './SkeletonImage.vue'
import SkeletonDocument from './SkeletonDocument.vue'

export default {
  components: { SkeletonImage, SkeletonDocument },
  props: {
    variant: {
      type: String,
      default: 'image',
      validator: function(value) {
        return ['image', 'document'].includes(value)
      }
    }
  }
}
</script>