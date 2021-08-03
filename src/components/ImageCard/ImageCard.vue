<template>
  <TransitionRoot
    show
    appear
    enter="transform ease-in duration-300 transition"
    enterFrom="translate-y-2 opacity-0"
    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
  >
    <div class="root">
      <img
        :src="imageUrl"
        :class="['image', selected ? 'opacity-40' : 'opacity-100']"
      />
      <div class="flex justify-center items-center">
        <div
          :class="[
            'card-container',
            aboutToWin() ? 'bg-yellow-300' : 'bg-white'
          ]"
        >
          <div class="h-full flex flex-col justify-between items-center">
            <div class="w-full">
              <span :class="['name', aboutToWin() ? 'text-yellow-50' : 'text-gray-700']">{{ name }}</span>
            </div>
            <div class="w-full">
              <div class="float-right flex flex-row items-center gap-3">
                <span
                  :class="[
                    'points',
                    aboutToWin() ? 'text-yellow-50' : 'text-yellow-400'
                  ]"
                >{{ points }} / {{ pointsToWin }}</span>
                <div>
                  <input
                    type="radio"
                    class="hidden"
                    :name="radioName"
                    :id="id"
                    :value="value"
                    @change="onChange"
                  />
                  <label :for="id" class="container">
                    <StarIcon class="checkmark" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>

<script>
import { StarIcon } from '@heroicons/vue/solid'
import { TransitionRoot  } from "@headlessui/vue";

export default {
  name: 'ImageCard',
  inheritAttrs: false,
  components: {
    StarIcon,
    TransitionRoot
  },
  props: {
    radioName: String,
    name: String,
    points: Number,
    pointsToWin: Number,
    selected: Boolean,
    imageUrl: String,
    id: Number,
    isChecked: Boolean,
    value: String,
    onChange: {
      type: Function,
      default: (e) => {}
    }
  },
  methods: {
    aboutToWin() {
      return this.points >= this.pointsToWin && this.selected
    }
  }
}
</script>

<style scoped>
.root {
  @apply relative mx-auto space-y-6 xl:space-y-10 h-96 w-full;
}
.image {
  @apply w-full h-80 rounded-2xl mx-auto object-cover transition duration-200;
}
.card-container {
  @apply absolute top-64 h-28 w-11/12 rounded-md px-4 py-4 shadow-xl;
  min-width: 300px;
}
.name {
  @apply float-left pl-2 text-xl font-bold;
}
.points {
  @apply font-bold text-lg;
}
.checkmark {
  @apply
    w-8 h-8 rounded-full cursor-pointer
    transition ease-in-out transform;
}
.container {
  @apply text-gray-400 transform;
}
input:checked + label>.checkmark {
  @apply text-yellow-500;
  animation-name: upvote;
  animation-duration: 170ms;
}
@keyframes upvote {
  from {
    transform: scale(1.25);
  }
  to {
    transform: scale(0.8);
  }
}
</style>
