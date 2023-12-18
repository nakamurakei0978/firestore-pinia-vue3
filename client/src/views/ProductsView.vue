<script setup>
import { ref, watch } from 'vue';
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import ProductCard from '@/components/ProductCard.vue';
import ProductCardSkelly from '@/components/ProductCardSkelly.vue'
import { useCategoryStore } from '@/stores/category';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";


const categoryStore = useCategoryStore()
categoryStore.getCategories()
const productStore = useProductStore()
const cartStore = useCartStore()
productStore.getProducts()
const grid_cols = ref('xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1')
watch(() => cartStore.isToggled, () => {
    grid_cols.value = cartStore.isToggled ? 'xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1' : 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'
});
grid_cols.value = cartStore.isToggled ? 'xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1' : 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'

const loadMore = (state) => {
      //calling the api
}

const search = ref('')
</script>

<template>
    <div class="min-h-screen">
        <section class="bg-green-500 h-[calc(100vh/2)] w-full p-[10px_30px] text-black grid">
            <div class="bg-white rounded-xl"></div>
        </section>
        <section class="m-[20px_30px]">
            <section class="p-3 bg-slate-800 rounded-xl items-center flex justify-between overflow-clip relative">
                <span class="h-16 w-16 bg-green-600 absolute -left-[20px] rounded-full"></span>
                <h1 class="text-xl z-10">Products</h1>
                <div class="relative">
                    <span class="mr-5">
                        123
                    </span>
                    <input v-model="search" placeholder="Search" type="search" name="search"
                        class=" h-10 rounded-xl pl-3 pr-10 text-black focus:ring-0 focus:border-0 focus:inset-0">
                    <button type="button" class="p-3 scale-[0.7] bg-green-500 duration-200 hover:bg-green-800 absolute rounded-xl right-[-3px] top-[-3.8px]">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </section>
            <section class="relative">
                <div class="grid" :class="grid_cols">
                    <div v-for="p in productStore.products">
                        <!-- component -->
                        <ProductCard :product="p" />
                    </div>
                    <!-- <InfiniteLoading @infinite="loadMore" /> -->
                </div>
                <!-- //skeleton loading -->
                <div v-if="productStore.loading" class="grid absolute top-0 w-full animate-pulse" :class="grid_cols">
                    <div v-for="p in 4">
                        <!-- component -->
                        <ProductCardSkelly />
                    </div>
                </div>
            </section>
        </section>


    </div>
</template>

<style scoped></style>