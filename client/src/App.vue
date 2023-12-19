<script setup>
import { ref, watch, onMounted, onBeforeMount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Cart from './components/Cart.vue'
import FooterMain from './components/FooterMain.vue'
import { useCartStore } from './stores/cart'
import { useAuthStore } from './stores/auth'
import { or } from 'firebase/firestore'

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
  <nav v-if="!$route.path.startsWith('/admin')" class="h-[69.6px]">
    <Navbar />
  </nav>

  <div v-if="!$route.path.startsWith('/admin')" class="grid transition-all duration-300" :class="grid_cols">
    <div>
      <RouterView />
      <FooterMain />
    </div>
    <Cart />
  </div>

  <!-- admin -->
  <RouterView v-if="$route.path.startsWith('/admin')" />
</template>

<style scoped></style>