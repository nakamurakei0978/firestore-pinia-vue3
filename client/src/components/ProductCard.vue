<script setup>
import { useCartStore } from '@/stores/cart';


const props = defineProps({
    product: Object
})

const cartStore = useCartStore()

</script>

<template>
    <div class="mx-auto mt-11 w-80 transform overflow-hidden rounded-xl bg-slate-900 backdrop:blur-xl shadow-md
                        duration-300 md:hover:scale-105 hover:shadow-md hover:shadow-green-500">
        <img class="h-48 w-full object-cover object-center" :src="product.data.image" alt="Product Image" />
        <div class="p-4">
            <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">{{ product.data.name || 'name' }}</h2>
            <p class="mb-2 text-base dark:text-gray-300 text-gray-700">{{ product.data.description || '' }}</p>
            <div class="flex items-center">
                <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${{ product.data.price || '$9.99' }}</p>
                <button @click="cartStore.addToCart(product)"
                    class="bg-green-500 ml-auto text-base font-medium text-white p-[8px_15px] rounded-xl hover:bg-green-800 duration-200">To
                    cart</button>
            </div>
        </div>
    </div>
</template>