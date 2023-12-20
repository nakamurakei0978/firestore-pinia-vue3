<script setup>
import {RouterLink, RouterView} from 'vue-router'
import Sidebar from '@/components/admin/Sidebar.vue';

</script>

<template>
    <Transition>
        <div v-if="true" class="min-h-screen grid grid-cols-[320px_1fr]">
            <Sidebar />
    
            <router-view />
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