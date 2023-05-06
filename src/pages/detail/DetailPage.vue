<template>
  <!-- <h1 v-if="isLoading">Đang tải...</h1> -->
  <!-- <h1>{{ data?.service_name }}</h1> -->
  <!-- <v-btn @click="onAddCart" color="var(--orange)" variant="tonal">Thêm vào giỏ hàng</v-btn> -->
  <div>
    {{ count }}
    <button @click="handleCount">Set count</button>

    {{ optionsCount }}
    <button @click="setOptionsCount(18)">Set count option</button>
    <br>
    {{ pro.price }}
    <button @click="changePrice">Price</button>
  </div>
</template>
<script lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/apiClient'
import store from '@/store'
import axios from 'axios'
import { ref } from 'vue'
import { reactive } from 'vue'

export default defineComponent({
  name: 'DetailPage',
  data() {
    return {
      detail: null,
      optionsCount: 1,
      pro:{
        name:'',
        price:0
      }
    }
  },
  async mounted() {
    const response = await axios.get('https://api.myspa.vn/v1/organizations')
    this.$data.detail = response.data.data?.context
  },
  methods: {
    setOptionsCount(arg: number) {
      this.$data.optionsCount = arg
    },
    changePrice(){
      this.$data.pro.price = 1000
    }
  },
  setup() {
    const route: any = useRoute()
    const { data, isLoading } = useQuery({
      queryKey: ['service', route.params.id],
      queryFn: () => api.service(route.params.id),
      refetchOnWindowFocus: false,
    })
    const detail = computed(() => data.value)
    const onAddCart = () => {
      store.dispatch('CART_ADD', {
        item: detail.value,
        type: 'SERVICE',
        quantity: 1
      })
    }
    const count = ref(1)
    const person2 = ref({
      name:'', address:''
    })
    const person = reactive({
      name: 'Toan',
      age: 21,
      address: 'Thu Duc'
    })
    const tes = reactive({count:1})
    // const [count, setCount] = useState(1)
    // const onCount = () => setCount(count+1)
    //const [person, setPerson] = useState({name: 'Toan',age: 21,address: 'Thu Duc'})
    //setPerson({...person, name:''})
    const handleCount = () => count.value = count.value + 1
    const changePerson = () => {
      person.name = 'Long'
      person.age = 100
    }
    const changePerson2 = ()=> person2.value.name = 'toan'
    const onChangeTest = () => tes.count = 1
    // return { detail, isLoading, onAddCart, data }
    return { handleCount, count, person, changePerson }
  }
})
</script>