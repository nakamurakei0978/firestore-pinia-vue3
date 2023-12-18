<script setup>
import { useCartStore } from '@/stores/cart';
import { onMounted, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const cartStore = useCartStore()
const isCartToggled = ref(null)
watch(() => cartStore.isToggled, (newVal) => {
    isCartToggled.value = newVal ? 'text-green-500' : 'text-white'
});


const isProfileButtonClicked = ref(false)
function handleProfileButton() {
    isProfileButtonClicked.value = !isProfileButtonClicked.value
}
onMounted(() => {
    document.addEventListener('click', ($event) => {
        const target = $event.target.closest('.profile-drop')
        if (target === null && !$event.target.closest('.profile')) {
            isProfileButtonClicked.value = false
        }
    })
})

function signOut() {

    Swal.fire({
        title: "Are you sure?",
        text: "You about to logout!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Logged out!",
                text: "Logged out successfully.",
                icon: "success"
            }).then(() => {
                cartStore.saveCartItems()
                authStore.handleSignOut()
            })
        }
    })
    
}

const isMenuToggle = ref(false)
function menuToggle() {
    isMenuToggle.value = !isMenuToggle.value
}

</script>

<template>
    <nav
        class="bg-black/90 backdrop-blur-xl text-lg flex justify-between fixed top-0 w-screen items-center ps-8 pe-8 border-b-2 border-b-green-500/30 z-50">
        <span class="text-4xl h-10 w-52">SHOP</span>
        <span class="flex gap-2 max-md:hidden">
            <RouterLink :to="{ name: 'home' }" class="p-3 m-2 rounded-xl transition-colors duration-200 hover:text-green-500"
                active-class="bg-slate-800 text-green-500">Home</RouterLink>
            <RouterLink :to="{ name: 'products' }" class="p-3 m-2 rounded-xl transition-colors duration-200 hover:text-green-500"
                active-class="bg-slate-800 text-green-500">Products</RouterLink>
            <RouterLink :to="{ name: 'about' }" class="p-3 m-2 rounded-xl transition-colors duration-200 hover:text-green-500"
                active-class="bg-slate-800 text-green-500">About</RouterLink>
        </span>
        <span class="flex gap-2 w-52 justify-end items-center">
            <RouterLink :to="{name: 'favourites'}" active-class="bg-slate-800 text-green-500" class="duration-200 p-3 mt-2 mb-2  rounded-xl hover:text-green-500">
                <button >
                    <i class="fa-solid fa-heart "></i>
                </button>
            </RouterLink>
            <button class="relative p-3 text" @click="cartStore.toggleCart()" :class="isCartToggled">
                <i class="fa-solid fa-cart-shopping"></i>
                <span v-if="cartStore.countTotal > 0"
                    class="text-white ps-1 pe-1 text-center text-base/4 absolute bg-red-500 min-w-5 h-5 rounded-2xl right-0 top-1 animate-pulse ">
                    {{ cartStore.getCountTotal }}
                </span>
            </button>
            <span @click="handleProfileButton"
                class="profile bg-white inline-block h-10 w-10 rounded-full hover:cursor-pointer relative">
                <img class="rounded-full object-contain"
                    src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png" alt="">
                <Transition name="slide-fade">
                    <div v-if="isProfileButtonClicked"
                        class="profile-drop absolute backdrop-blur-xl bg-black/50  top-14 right-0 flex flex-col flex-nowrap whitespace-nowrap rounded-lg backdrop:rounded-lg">
                        <RouterLink to="#" class="p-[5px_25px] hover:text-green-500 duration-200 w-40">Profile</RouterLink>
                        <RouterLink :to="{ name: 'orders' }" class="p-[5px_25px] hover:text-green-500 duration-200 w-40">
                            Orders</RouterLink>
                        <RouterLink v-if="!authStore.isLoggedIn" :to="{ name: 'login' }"
                            class="p-[5px_25px] hover:text-green-500 duration-200 w-40">Login</RouterLink>
                        <RouterLink v-if="!authStore.isLoggedIn" :to="{ name: 'register' }"
                            class="p-[5px_25px] hover:text-green-500 duration-200 w-40">Sign up</RouterLink>
                        <button v-if="authStore.isLoggedIn"  @click="signOut"
                            class="p-[5px_25px] text-left hover:text-green-500 duration-200 w-40">Log out</button>
                    </div>
                </Transition>
            </span>
            <button @click="menuToggle" class="md:hidden text-2xl  ml-3 rounded-xl p-3" :class="isMenuToggle? 'text-green-500 bg-slate-800':''">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
        </span>
        <Transition name="slide-fade">
            <span v-if="isMenuToggle"
                class="rounded-lg backdrop:rounded-lg flex md:hidden absolute top-[4.5rem] right-4 bg-black/50 backdrop-xl flex-col">
                <RouterLink :to="{ name: 'home' }" class="p-[5px_25px] transition-colors duration-200 hover:text-green-500"
                    active-class="text-green-500">Home</RouterLink>
                <RouterLink :to="{ name: 'products' }"
                    class="p-[5px_25px] transition-colors duration-200 hover:text-green-500" active-class="text-green-500">
                    Products</RouterLink>
                <RouterLink :to="{ name: 'about' }" class="p-[5px_25px] transition-colors duration-200 hover:text-green-500"
                    active-class="text-green-500">About</RouterLink>
            </span>
        </Transition>
    </nav>
</template>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
}</style>