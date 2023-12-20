<script setup>
import { RouterLink } from 'vue-router';
import { useHomepageStore } from '@/stores/homepage';

const homepageStore = useHomepageStore()
homepageStore.getHomepage()

</script>

<template>
    <Transition>
        <div class="min-h-screen relative" v-if="!homepageStore.isLoading">
            <section class="bg-green-500 h-[calc(100vh/2)] -z-10 w-full top-0 absolute"></section>
            <section class="">
                <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                        <div class="grid place-content-center rounded-xl bg-black/50 p-6 sm:p-8 backdrop:blur-xl">
                            <div class="mx-auto max-w-md text-center lg:text-left">
                                <header>
                                    <h2 class="text-xl font-bold text-white sm:text-3xl">{{ homepageStore.homepage.title }}</h2>
    
                                    <p class="mt-4 text-white/80">
                                        {{ homepageStore.homepage.subtitle }}
                                    </p>
                                </header>
    
                                <RouterLink :to="{name:'products'}"
                                    class="mt-8 inline-block rounded-xl border border-green-500 bg-green-500 hover:bg-green-700 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none">
                                    {{ homepageStore.homepage.button }}
                                </RouterLink>
                            </div>
                        </div>
    
                        <div class="lg:col-span-2 lg:py-8">
                            <ul class="grid grid-cols-2 gap-4" >
                                <li class="bg-slate-900 backdrop:blur-xl rounded-xl duration-300 hover:shadow-green-500 hover:shadow-md">
                                    <a href="#" class="group block">
                                        <img :src="homepageStore.homepage.image.first"
                                            alt="" class="aspect-square w-full rounded-xl object-cover" />
    
                                        <div class="mt-3">
                                            <h3
                                                class="ps-3 font-medium text-white group-hover:text-green-500 duration-200">
                                                {{ homepageStore.homepage.product_name.first }}
                                            </h3>
    
                                            <p class="ps-3 pb-3 mt-1 text-sm text-white/70">${{homepageStore.homepage.price.first}}</p>
                                        </div>
                                    </a>
                                </li>
    
                                <li class="bg-slate-900 backdrop:blur-xl rounded-xl duration-300 hover:shadow-green-500 hover:shadow-md">
                                    <a href="#" class="group block">
                                        <img :src="homepageStore.homepage.image.second"
                                            alt="" class="aspect-square w-full rounded-xl object-cover" />
    
                                        <div class="mt-3">
                                            <h3
                                                class="ps-3 font-medium text-white group-hover:text-green-500 duration-200">
                                                {{ homepageStore.homepage.product_name.second }}
                                            </h3>
    
                                            <p class="ps-3 mt-1 text-sm text-white/70">${{homepageStore.homepage.price.second}}</p>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>