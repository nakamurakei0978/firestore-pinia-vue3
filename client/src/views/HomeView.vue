<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="min-h-screen relative">
        <section class="bg-green-500 h-[calc(100vh/2)] -z-10 w-full top-0 absolute"></section>
        <section class="">
            <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                    <div class="grid place-content-center rounded-xl bg-black/50 p-6 sm:p-8 backdrop:blur-xl">
                        <div class="mx-auto max-w-md text-center lg:text-left">
                            <header>
                                <h2 class="text-xl font-bold text-white sm:text-3xl">Shop now</h2>

                                <p class="mt-4 text-white/80">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas rerum quam amet
                                    provident nulla error!
                                </p>
                            </header>

                            <RouterLink :to="{name:'products'}"
                                class="mt-8 inline-block rounded-xl border border-green-500 bg-green-500 hover:bg-green-700 px-12 py-3 text-sm font-medium text-white hover:text-green-500 transition hover:shadow focus:outline-none">
                                Shop All
                            </RouterLink>
                        </div>
                    </div>

                    <div class="lg:col-span-2 lg:py-8">
                        <ul class="grid grid-cols-2 gap-4" >
                            <li v-for="i in 2" class="bg-slate-900 backdrop:blur-xl rounded-xl duration-300 hover:shadow-green-500 hover:shadow-md">
                                <a href="#" class="group block">
                                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                                        alt="" class="aspect-square w-full rounded-xl object-cover" />

                                    <div class="mt-3">
                                        <h3
                                            class="ps-3 font-medium text-white group-hover:text-green-500 duration-200">
                                            Simple Watch
                                        </h3>

                                        <p class="ps-3 pb-3 mt-1 text-sm text-white/70">$150</p>
                                    </div>
                                </a>
                            </li>

                            <!-- <li>
                                <a href="#" class="group block">
                                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                                        alt="" class="aspect-square w-full rounded-xl object-cover" />

                                    <div class="mt-3">
                                        <h3
                                            class="font-medium text-white group-hover:text-green-500 duration-200">
                                            Simple Watch
                                        </h3>

                                        <p class="mt-1 text-sm text-white/70">$150</p>
                                    </div>
                                </a>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped></style>