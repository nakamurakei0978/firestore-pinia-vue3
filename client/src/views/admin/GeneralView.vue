<script setup>
import { useCategoryStore } from '@/stores/category';
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/product'
import Sidebar from '@/components/admin/Sidebar.vue'

const categoryStore = useCategoryStore()
const productStore = useProductStore()

onMounted(() => {
    categoryStore.getCategories()
})

const name = ref('')
const price = ref(0)
const category_id = ref('')
let image
const handleImage = (e) => {
    image = e.target.files[0]
}

</script>

<template>
    <div class="bg-black grid place-items-center">
            <form action="" class="flex flex-col gap-3 text-white">
                <label for="name">name:</label>
                <input class="text-black" v-model="name" type="text" required>
                <label for="price">price:</label>
                <input class="text-black" v-model="price" type="text" required>
                <label for="category">category:</label>
                <select v-model="category_id" class="text-black" name="category" id="category" required>
                    <option v-for="c in categoryStore.categories" :value="c.id">{{ c.data.name }}</option>
                </select>
                <input @change="handleImage($event)" type="file" name="image" id="image">

                <button class="bg-green-500" @click="productStore.addProduct(name, price, category_id, image)"
                    type="button">Submit</button>
            </form>
        </div>
</template>