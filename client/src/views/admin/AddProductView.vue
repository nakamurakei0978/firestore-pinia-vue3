<script setup>
import { useCategoryStore } from '@/stores/category';
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/product'
import Sidebar from '@/components/admin/Sidebar.vue'

const isSubmitting = ref(false)
const isLoading = ref(true)
const categoryStore = useCategoryStore()
const productStore = useProductStore()

onMounted(async () => {
    isLoading.value = true
    await categoryStore.getCategories()
    isLoading.value = false
})

const name = ref('')
const price = ref(0)
const category_id = ref('')
let image
const handleImage = (e) => {
    image = e.target.files[0]
}

async function handleSubmit() {
    isSubmitting.value = true
    await productStore.addProduct(name, price, category_id, image).then(isSubmitting.value = false)
}
</script>

<template>
    <Transition>
        <div v-if="!isLoading" class="bg-black grid place-items-center">
            <form action="" class="flex flex-col gap-3 text-white">
                <label for="name">Name:</label>
                <input class="text-black p-2 rounded-xl" v-model="name" type="text" required>
                <label for="price">Price:</label>
                <input class="text-black p-2 rounded-xl" v-model="price" type="text" required>
                <label for="category">Category:</label>
                <select v-model="category_id" class="text-black p-2 rounded-xl" name="category" id="category" required>
                    <option v-for="c in categoryStore.categories" :value="c.id">{{ c.data.name }}</option>
                </select>
                <label for="image">Image:</label>
                <input class="text-slate-400 bg-white my-auto rounded-xl border-green-500 border"
                    @change="handleImage($event)" type="file" name="image" id="image">

                <button class="bg-green-500 p-2 rounded-xl hover:bg-green-700 duration-200" @click="handleSubmit()"
                    type="button">
                    <i class="fa-solid fa-spinner animate-spin" v-if="isSubmitting"></i>
                    Submit
                </button>
            </form>
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