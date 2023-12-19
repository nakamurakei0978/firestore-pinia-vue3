<script setup>
import {RouterLink, RouterView} from 'vue-router'
import Sidebar from '@/components/admin/Sidebar.vue';

</script>

<template>
    <div class="min-h-screen grid grid-cols-[320px_1fr]">
        <Sidebar />

        <router-view />
    </div>
</template>