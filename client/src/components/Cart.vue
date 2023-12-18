<script setup>
import { onMounted, ref, watch } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useCategoryStore } from '@/stores/category';
import { useAuthStore } from '@/stores/auth';
import { useProductStore } from '@/stores/product';

const productStore = useProductStore()
const authStore = useAuthStore()
const categoryStore = useCategoryStore()
const cartStore = useCartStore()
const cartPosition = ref('right-[-370px]')
watch(() => cartStore.isToggled, (newVal) => {
    cartPosition.value = newVal ? 'right-0' : 'right-[-370px]'
});
watch(() => cartStore.countTotal, () => {
    if (authStore.isLoggedIn) {
        cartStore.saveCartItems()
    }
})


const checkout = () => {
    fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 3 },
                { id: 2, quantity: 4 },
            ]
        })
    }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
        console.log(url);
        const link = url
        window.location.href = link;
    }).catch(e => {
        console.log(e.error);
    })
}

</script>

<template>
    <div class=" bg-slate-800 h-[100%] fixed right-0 w-[370px] transition-all duration-300" :class="cartPosition">
        <div class="sticky bg-slate-600 h-screen">
            <section class="flex justify-between bg-black ps-5 pe-5 pt-3 pb-3 font-medium">
                <h1>My cart</h1>
                <span>
                    <button class="hover:text-slate-400 transition-all duration-300"
                        @click="cartStore.close()">Close</button>
                </span>
            </section>
            <section class="p-5 h-[calc(100dvh-280px)] overflow-auto">
                <div v-if="cartStore.countTotal === 0" class="h-full grid place-items-center"><span>Cart is empty!</span>
                </div>
                <div v-for="(p, index) in cartStore.carts">
                    <p class="flex py-6">
                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                            class="h-full w-full object-cover object-center">
                    </div>

                    <div class="ml-4 flex flex-1 flex-col">
                        <div>
                            <div class="flex justify-between text-base font-medium text-white">
                                <h3>
                                    <a href="#">{{ p.data.name }}</a>
                                </h3>
                                <p class="ml-4">${{ p.data.subTotal }}</p>
                            </div>
                            <p class="mt-1 text-sm text-white/70">{{ categoryStore.getCategoryName(p.data.category_id) }}
                            </p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                            <p class="text-white/70 ">Qty
                                <button @click="cartStore.decrement(index)" class="ml-2 text-xl hover:text-green-500"><i
                                        class="fa-solid fa-caret-left"></i></button>
                                <span class="text-xl ms-1 me-1">{{ p.data.qty }}</span>
                                <button @click="cartStore.increment(index)" class="text-xl hover:text-green-500"><i
                                        class="fa-solid fa-caret-right"></i></button>
                            </p>

                            <div class="flex">
                                <button @click="cartStore.remove(index)" type="button"
                                    class="font-medium text-green-500 hover:text-green-500/80">Remove</button>
                            </div>
                        </div>
                    </div>
                    </p>
                </div>
            </section>
            <section class="p-5 bottom-0 border-t-2 border-t-slate-50/20">
                <section>
                    <section class="justify-between flex font-medium">
                        <h1>Subtotal</h1>
                        <h1>${{ cartStore.getSubTotal }}</h1>
                    </section>
                    <p class="text-[0.85rem]">
                        Shipping and taxes calculated at checkout.
                    </p>

                    <button @click="checkout"
                        class="duration-300 hover:bg-green-500/80 mt-2 mb-2 bg-green-500 p-[10px_131px] font-medium rounded-md">Checkout</button>
                    <p class="text-[0.85rem] text-end">
                        <button @click="cartStore.clearCart()" class="hover:text-green-500 duration-300">
                            Clear cart
                        </button>
                    </p>
                </section>
            </section>
        </div>
    </div>
</template>