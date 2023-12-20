<script setup>
import { onMounted, ref } from "vue"
import { useHomepageStore } from '@/stores/homepage';

const homepageStore = useHomepageStore()
homepageStore.getHomepage()

async function handleChange() {
    if (homepageStore.title || homepageStore.subTitle || homepageStore.buttonText || homepageStore.first_product_name || homepageStore.second_product_name || images.length > 0 || homepageStore.first_product_price > 0|| homepageStore.second_product_price> 0) {
        await homepageStore.change(images)
        homepageStore.getHomepage()
    }
}

let images = []
const handleImage = (e, num) => {
    images.push({
        num: num,
        image: e.target.files[0]
    })
}
</script>

<template>
    <Transition>
        <div class="max-h-screen p-5 overflow-auto" v-if="!homepageStore.isLoading">
            <section class="text-2xl relative mb-5">
                <h1 class="z-10 relative">
                    Preview
                </h1>
                <span class="absolute -left-12 -top-20 h-40 w-40 rounded-full bg-green-500 block"></span>
            </section>
            <section class="bg-white rounded-xl">
                <div class="mx-auto max-w-screen px-4 py-8">
                    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                        <div class="grid place-content-center rounded-xl bg-black/50 p-6 sm:p-8 backdrop:blur-xl">
                            <div class="mx-auto max-w-md text-center lg:text-left">
                                <header>
                                    <h2 class="text-xl font-bold text-white sm:text-3xl">{{ homepageStore.homepage.title }}
                                    </h2>

                                    <p class="mt-4 text-white/80">
                                        {{ homepageStore.homepage.subtitle }}
                                    </p>
                                </header>

                                <button type="button"
                                    class="mt-8 inline-block rounded-xl border border-green-500 bg-green-500 hover:bg-green-700 px-12 py-3 text-sm font-medium text-white transition hover:shadow focus:outline-none">
                                    {{ homepageStore.homepage.button }}
                                </button>
                            </div>
                        </div>

                        <div class="lg:col-span-2 lg:py-8">
                            <ul class="grid grid-cols-2 gap-4">
                                <li
                                    class="bg-slate-900 backdrop:blur-xl rounded-xl duration-300 hover:shadow-green-500 hover:shadow-md">
                                    <a href="#" class="group block">
                                        <img :src="homepageStore.homepage.image.first" alt=""
                                            class="aspect-square w-full rounded-xl object-cover" />

                                        <div class="mt-3">
                                            <h3 class="ps-3 font-medium text-white group-hover:text-green-500 duration-200">
                                                {{ homepageStore.homepage.product_name.first }}
                                            </h3>

                                            <p class="ps-3 pb-3 mt-1 text-sm text-white/70">
                                                ${{ homepageStore.homepage.price.first }}</p>
                                        </div>
                                    </a>
                                </li>

                                <li
                                    class="bg-slate-900 backdrop:blur-xl rounded-xl duration-300 hover:shadow-green-500 hover:shadow-md">
                                    <a href="#" class="group block">
                                        <img :src="homepageStore.homepage.image.second" alt=""
                                            class="aspect-square w-full rounded-xl object-cover" />

                                        <div class="mt-3">
                                            <h3 class="ps-3 font-medium text-white group-hover:text-green-500 duration-200">
                                                {{ homepageStore.homepage.product_name.second }}
                                            </h3>

                                            <p class="ps-3 pb-3 mt-1 text-sm text-white/70">
                                                ${{ homepageStore.homepage.price.second }}</p>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section class="mt-10 mb-5 text-2xl relative">
                <h1 class="z-10 relative">
                    Customize
                </h1>
                <span class="absolute -z-10 -left-16 -top-24 h-40 w-40 rounded-full bg-green-500 block"></span>
            </section>
            <section>
                <div class="mb-5 flex gap-5">
                    <div>
                        <label class="" for="title">Title: </label>
                        <input v-model="homepageStore.title" class="text-black p-2 rounded-xl" type="text"
                            :placeholder="homepageStore.homepage.title">
                    </div>
                    <div>
                        <label for="subTitle">Subtitle: </label>
                        <input v-model="homepageStore.subTitle" :placeholder="homepageStore.homepage.subtitle"
                            class="w-80 text-black p-2 rounded-xl" />
                    </div>
                    <div>
                        <label for="buttonText">Text for the button: </label>
                        <input v-model="homepageStore.buttonText" type="text" :placeholder="homepageStore.homepage.button"
                            class="text-black p-2 rounded-xl">
                    </div>
                </div>
                <div class="mb-5 flex gap-5">
                    <label for="first product">First product:</label>
                    <input v-model="homepageStore.first_product_name" type="text"
                        :placeholder="homepageStore.homepage.product_name.first" class="text-black p-2 rounded-xl">
                    <label>price:</label>
                    <input  min="0" value="0" v-model="homepageStore.first_product_price" type="number" class="text-black p-2 rounded-xl">
                    <label for="image">Image:</label>
                    <input @change="handleImage($event, 1)" type="file" class="text-slate-400 bg-white my-auto rounded-xl border-green-500 border">
                </div>
                <div class="mb-5 flex gap-5">
                    <label for="first product">Second product:</label>
                    <input v-model="homepageStore.second_product_name" type="text"
                        :placeholder="homepageStore.homepage.product_name.second" class="text-black p-2 rounded-xl">
                    <label>price:</label>
                    <input min="0" value="0" v-model="homepageStore.second_product_price" type="number" class="text-black p-2 rounded-xl">
                    <label for="image">Image:</label>
                    <input @change="handleImage($event, 2)" type="file" class="text-slate-400 bg-white my-auto rounded-xl border-green-500 border" >
                </div>
                <button @click="handleChange" type="button" class="p-5 rounded-xl bg-green-500 hover:bg-green-700">
                    <i v-if="homepageStore.isChanging" class="fa-solid fa-spinner animate-spin"></i> Change
                </button>
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