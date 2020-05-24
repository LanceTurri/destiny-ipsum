<template>
    <div class="generator-form">
        <button
            class="generator-form__button"
            type="button"
            @click="$emit('prune')">
                <svg class="generator-form__button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M417.4 224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32h322.8c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z"/></svg>
            </button>

        <div
            class="generator-form__count">{{ count }}</div>

        <button
            class="generator-form__button"
            type="button"
            @click="$emit('generate')">
                <svg class="generator-form__button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M417.4 224H288V94.6c0-16.9-14.3-30.6-32-30.6s-32 13.7-32 30.6V224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32H224v129.4c0 16.9 14.3 30.6 32 30.6s32-13.7 32-30.6V288h129.4c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z"/></svg>
            </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'GeneratorForm',
    props: {
        count: {
            type: Number,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
.generator-form {
    align-items: center;
    border-top: 2px solid var(--generator-main-color);
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    padding-top: 16px;
}

.generator-form__button {
    align-items: center;
    background: none;
    border: 2px solid var(--generator-main-color);
    border-radius: 28px;
    color: var(--generator-main-color);
    cursor: pointer;
    display: flex;
    height: 28px;
    justify-content: center;
    margin: 0 16px;
    opacity: 0.8;
    padding: 6px;
    text-shadow: none;
    transition: 200ms all linear;
    user-select: none;
    width: 28px;

    &:hover {
        background-color: var(--generator-main-color);
        color: var(--generator-hover-color);
        opacity: 1.0;

        svg {
            fill: var(--generator-hover-color);
        }
    }
}

.generator-form__button-icon {
    fill: var(--generator-main-color);
    flex-shrink: 0;
    height: 12px;
    transition: all 200ms linear;
    width: 12px;
}

.generator-form__count {
    color: var(--generator-main-color);
    font-weight: 700;
}
</style>