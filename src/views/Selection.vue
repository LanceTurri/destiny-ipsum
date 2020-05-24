<template>
    <div class="selection">
        <router-link
            class="selection__item"
            tag="div"
            to="/shaxx">
            <div class="selection__content selection__content--shaxx">
                <div class="selection__title">Shaxx</div>
            </div>
        </router-link>

        <router-link
            class="selection__item"
            tag="div"
            to="/vance">
            <div class="selection__content selection__content--vance">
                <div class="selection__title">Brother Vance</div>
            </div>
        </router-link>

        <router-link
            class="selection__item"
            tag="div"
            to="/drifter">
            <div class="selection__content selection__content--drifter">
                <div class="selection__title">Drifter</div>
            </div>
        </router-link>

        <router-link
            class="selection__item"
            tag="div"
            to="/cayde">
            <div class="selection__content selection__content--cayde">
                <div class="selection__title">Cayde</div>
            </div>
        </router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'selection',
});
</script>

<style lang="scss" scoped>
.selection {
    background-color: #000000; // Gives more contrast
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.selection__item {
    height: 25%;
    width: 100%;
}

@media (min-width: 768px) { 
    .selection {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .selection__item {
        height: 50%;
        width: 50%;
    }
}

@media (min-width: 1280px) {
    .selection {
        flex-wrap: nowrap;
    }

    .selection__item {
        height: 100%;
        width: 25%;
    }
}

.selection__title {
    font-family: 'Comfortaa', cursive;
    font-size: 32px;
}

.selection__content {
    align-items: flex-end;
    background-color: #f5f5f5;
    background-position: center;
    background-size: cover;
    cursor: pointer;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    opacity: 0.9;
    padding: 40px;
    transition: 200ms all linear;

    &:hover {
        opacity: 1.0;
    }

    &--cayde {
        background-image: url('../assets/cayde.jpg');
        color: #f5f5f5;
    }

    &--drifter {
        background-image: url('../assets/drifter.jpg');
        color: #f5f5f5;
    }

    &--shaxx {
        background-image: url('../assets/shaxx.jpg');
        color: #f5f5f5;
    }

    &--vance {
        background-image: url('../assets/vance.jpg');
        color: #333333;
    }
}
</style>