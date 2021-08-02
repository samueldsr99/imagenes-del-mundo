<template>
  <BaseLayout>
    <template v-slot:title>
      <div class="flex flex-col items-center">
        <div class="lg:w-1/2 sm:w-full">
          <SearchInput
            v-model="keyword"
            placeholder="Buscar en la web..."
            :onClick="search"
          />
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div v-if="!someCard" class="lg:w-1/2">
        <TheRanking :sellers="sellers" pointsToWin="20" />
      </div>
      <div class="images-container">
        <div v-for="seller in sellers" :key="seller.id">
          <div v-if="seller.imageUrl" class="relative flex flex-col items-center">
            <ImageCard
              radioName="contest-images"
              :id="seller.id"
              :name="seller.name"
              :points="seller.points + (seller.selected ? 3 : 0)"
              :pointsToWin="20"
              :imageUrl="seller.imageUrl"
              :value="`${seller.id}`"
              :selected="selected === seller.id"
              :onChange="handleSelect"
            />
            <div
              v-if="selected === seller.id"
              class="w-44 absolute top-1/3"
            >
              <UpvoteButton @click="handleUpvote">Votar</UpvoteButton>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import { ref } from 'vue'

import BaseLayout from '@/layouts'
import SearchInput from '@/components/SearchInput'
import ImageCard from '@/components/ImageCard'
import UpvoteButton from '@/components/UpvoteButton'
import TheRanking from '@/components/TheRanking'
import { getAllSellers, upvote } from '@/services/alegra.js'
import { fetchImages } from "@/services"

export default {
  components: {
    BaseLayout,
    SearchInput,
    ImageCard,
    UpvoteButton,
    TheRanking
  },
  setup() {
    const sellers = ref([])
    const selected = ref(-1)

    return {
      sellers,
      selected,
      keyword: ''
    }
  },
  mounted() {
    this.getSellers()
  },
  methods: {
    search() {
      this.selected = -1
      this.getSellers()
        .then(_ => {
          fetchImages(this.keyword, 3)
            .then(result => {
              this.sellers = this.sellers.map((r, i) => {
                return {
                  ...r,
                  selected: false,
                  imageUrl: result[i]?.urls?.regular || '',
                }
              })
            })
            .catch(e => console.error(e))
        })
    },
    getSellers() {
      return getAllSellers()
        .then(e => {
          this.sellers = e.map(seller => {
            return {
              id: seller.id,
              name: seller.name,
              points: parseInt(seller.observations),
              imageUrl: '',
              selected: false
            }
          })
          Promise.resolve()
        })
    },
    handleSelect(e) {
      this.selected = parseInt(e.target.value)
      this.sellers = this.sellers.map(e => {
        return { ...e, selected: e.id === this.selected }
      })
    },
    handleUpvote() {
      const selected = this.sellers.find(e => e.id === this.selected)
      const points = selected.points + 3

      this.sellers = this.sellers.map(e => {
        return {
          ...e,
          imageUrl: '',
          points: e.id === this.selected ? points : e.points,
          selected: false
        }
      })
      upvote(this.selected, points)
        .then(e => {
          this.selected = -1
        })
        .catch(e => console.error(e))
    }
  },
  computed: {
    someCard() {
      return !!this.sellers.find(e => e.imageUrl.length > 0)
    },
  }
}
</script>

<style scoped>
.images-container {
  @apply
    grid grid-cols-1
    sm:grid-cols-2 sm:gap-x-2
    lg:grid-cols-3 lg:gap-x-3;
}
</style>
