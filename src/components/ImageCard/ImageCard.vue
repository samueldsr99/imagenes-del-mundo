<template>
  <TransitionRoot
    show
    appear
    enter="transform ease-in duration-300 transition"
    enterFrom="translate-y-2 opacity-0"
    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
  >
    <div class="root">
      <img :src="person.imageUrl" class="w-full h-80 rounded-2xl mx-auto object-cover" />
      <div class="flex justify-center items-center">
        <div class="absolute top-64 h-28 bg-white w-11/12 rounded-md px-4 py-4 shadow-xl">
          <div class="h-full flex flex-col justify-between items-center">
            <div class="w-full">
              <span class="name">{{ person.name }}</span>
            </div>
            <div class="w-full">
              <div class="float-right flex flex-row items-center gap-3">
                <span class="points">{{ person.points }}</span>
                <button type="button" class="upvote">
                  <StarIcon />
                </button>
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
  components: {
    StarIcon,
    TransitionRoot
  },
  props: {
    
  },
  setup() {
    return {
      person: {
        name: 'Samuel David',
        points: 20,
        imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      }
    }
  }
}
</script>

<style scoped>
.root {
  @apply relative mx-auto space-y-6 xl:space-y-10 h-96 w-full;
}
.name {
  @apply float-left pl-2 text-xl text-gray-700;
}
.points {
  @apply font-bold text-yellow-400 text-xl;
}
.upvote {
  @apply
    w-8 h-8 rounded-full
    transition ease-in-out
    active:bg-gray-100
    transform hover:scale-125 hover:rotate-45 
    bg-yellow-200 text-yellow-500;
}
</style>
