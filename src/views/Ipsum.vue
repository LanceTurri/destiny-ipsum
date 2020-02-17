<template>
    <div class="ipsum">
        <Generator msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
import Generator from '@/components/Generator.vue';

export default {
    name: 'Ipsum',
    components: {
        Generator,
    },
};
</script>

<style scoped>
.ipsum {
    background-image: url('../assets/background-1.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    height: 100%;
    justify-content: center;
}
</style>