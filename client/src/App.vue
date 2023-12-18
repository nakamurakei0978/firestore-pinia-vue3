<script setup>
import { ref, watch, onMounted, onBeforeMount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Cart from './components/Cart.vue'
import FooterMain from './components/FooterMain.vue'
import { useCartStore } from './stores/cart'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(() => {
  authStore.handleSignIn()
})

const grid_cols = ref('grid-cols-[1fr_0px]')
watch(() => cartStore.isToggled, (newVal) => {
  grid_cols.value = newVal ? 'grid-cols-[1fr_370px]' : 'grid-cols-[1fr_0px]'
});

</script>

<template>
  
  <nav v-if="$route.name != 'admin'" class="h-[69.6px]">
    <Navbar />
  </nav>

  <div class="grid transition-all duration-300" :class="grid_cols">
    <div>
      <RouterView />
      <FooterMain v-if="$route.name != 'admin'" />
    </div>
    <Cart />
  </div>
</template>

<style scoped></style>