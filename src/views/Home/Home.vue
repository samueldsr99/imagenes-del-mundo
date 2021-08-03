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
      <div class="flex flex-col gap-10">
        <div class="flex justify-end gap-3">
          <BaseButton
            variant="secondary"
            class="float-right w-10"
            @click="handleCleanPoints()"
          >
            <RefreshIcon class="h-6 w-6 mx-auto" />
          </BaseButton>
          <BaseButton
            variant="secondary"
            class="float-right w-10"
            @click="cleanImages()"
          >
            <UserGroupIcon class="h-6 w-6 mx-auto" />
          </BaseButton>
        </div>
        <div v-if="!loading && !someCard" class="lg:w-1/2">
          <h1 class="text-4xl font-extrabold text-gray-700">Posiciones</h1>
          <TheRanking :sellers="sellers" pointsToWin="20" />
        </div>
        <div>
          <ImagesContainer
            :sellers="sellers"
            :loading="loading"
            :selected="selected"
            :handleSelect="handleSelect"
            :handleUpvote="handleUpvote"
          />
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import { ref } from 'vue'
import {
  UserGroupIcon,
  RefreshIcon
} from '@heroicons/vue/outline'
import BaseLayout from '@/layouts'
import SearchInput from '@/components/SearchInput'
import BaseButton from '@/components/BaseButton'
import TheRanking from '@/components/TheRanking'
import { getAllSellers, upvote, cleanPoints } from '@/services/alegra.js'
import { fetchImages } from "@/services"
import ImagesContainer from '@/views/Home/ImagesContainer.vue'

export default {
  components: {
    BaseLayout,
    SearchInput,
    BaseButton,
    TheRanking,
    ImagesContainer,
    UserGroupIcon,
    RefreshIcon
  },
  setup() {
    const sellers = ref([])
    const selected = ref(-1)
    const loading = ref(false)

    return {
      sellers,
      loading,
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
      this.loading = true
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
              this.loading = false
            })
            .catch(e => console.error(e))
        })
    },
    cleanImages() {
      this.sellers = this.sellers.map(e => { return { ...e, imageUrl: '' } })
    },
    handleCleanPoints() {
      this.loading = true
      this.sellers = this.sellers.map(e => {
        return { ...e, points: 0 }
      })
      cleanPoints(this.sellers)
        .then(_ => {
          this.loading = false
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
        .then(_ => this.selected = -1)
        .catch(e => console.error(e))
    },
    setLoading(value) {
      this.loading = value
    }
  },
  computed: {
    someCard() {
      return !!this.sellers.find(e => e.imageUrl.length > 0)
    },
  }
}
</script>
