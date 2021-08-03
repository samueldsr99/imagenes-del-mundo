<template>
  <BaseLayout>
    <template v-slot:title>
      <div class="flex flex-col items-center">
        <div class="lg:w-1/2 sm:w-full">
          <SearchInput
            v-model="keyword"
            :disabled="finished"
            placeholder="Buscar en la web..."
            :onClick="search"
          />
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="flex flex-col gap-10">
        <HomeHeader
          :handleCleanPoints="handleCleanPoints"
          :cleanImages="cleanImages"
          :finished="finished"
          :winnerName="winner?.name || ''"
        />
        <div v-if="!loading && !someCard" class="lg:flex lg:gap-10">
          <div class="lg:w-1/2">
            <h1 class="text-4xl font-extrabold text-gray-700">Posiciones</h1>
            <TheRanking :sellers="sellers" pointsToWin="20" />
          </div>
          <Invoice
            class="lg:w-1/2"
            v-if="finished && !invoiceIsEmpty"
            :data="invoiceResponse"
          />
          <Skeleton variant="document" v-else-if="finished" />
        </div>
        <div v-if="!finished">
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
import { SparklesIcon } from '@heroicons/vue/outline'
import BaseLayout from '@/layouts'
import SearchInput from '@/components/SearchInput'
import BaseButton from '@/components/BaseButton'
import TheRanking from '@/components/TheRanking'
import Skeleton from '@/components/Skeleton'
import Invoice from '@/components/Invoice'
import { getAllSellers, upvote, cleanPoints, createInvoice } from '@/services/alegra.js'
import { fetchImages } from "@/services"
import ImagesContainer from './ImagesContainer.vue'
import HomeHeader from './HomeHeader.vue'

export default {
  components: {
    ImagesContainer,
    HomeHeader,
    BaseLayout,
    SearchInput,
    BaseButton,
    TheRanking,
    Invoice,
    Skeleton,
    SparklesIcon
  },
  setup() {
    const sellers = ref([])
    const selected = ref(-1)
    const loading = ref(false)
    const invoiceResponse = ref({})

    return {
      sellers,
      loading,
      selected,
      keyword: '',
      invoiceResponse
    }
  },
  mounted() {
    this.getSellers()
  },
  methods: {
    search() {
      this.selected = -1
      this.loading = true
      this.cleanImages()
      this.getSellers()
        .then(_ => {
          fetchImages(this.keyword, this.sellers.length)
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
    handleCreateInvoice() {
      return createInvoice({ total: this.pointsSum, winnerId: this.winner.id })
        .then(e => {
          this.invoiceResponse = e
          return Promise.resolve()
        })
        .catch(e => console.error(e))
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
  },
  computed: {
    someCard() {
      return !!this.sellers.find(e => e.imageUrl.length > 0)
    },
    finished() {
      return !!this.sellers.find(e => e.points >= 20)
    },
    pointsSum() {
      return this.sellers.reduce((prev, cur) => prev + cur.points, 0)
    },
    winner() {
      return this.sellers.length
        ? this.sellers.reduce((prev, cur) => cur.points > prev.points ? cur : prev)
        : undefined
    },
    invoiceIsEmpty() {
      return !Object.keys(this.invoiceResponse).length
    }
  },
  watch: {
    finished: function(newValue, oldValue) {
      if (newValue && !oldValue) { // create invoice
        this.handleCreateInvoice().then(() => {
          cleanPoints(this.sellers)
          console.log('reseted points')
        })
      }
    }
  }
}
</script>
