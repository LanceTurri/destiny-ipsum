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
    display: flex;
    justify-content: center;
    padding: 8px 0;
}

.generator-form__button {
    all: unset;
    align-items: center;
    background: none;
    border: 2px solid #333333;
    border-radius: 24px;
    color: #333333;
    cursor: pointer;
    display: flex;
    font-family: monospace;
    font-size: 20px;
    font-weight: 700;
    height: 24px;
    justify-content: center;
    line-height: 1;
    margin: 0 16px;
    user-select: none;
    text-shadow: none;
    width: 24px;
}

.generator-form__button-icon {
    height: 16px;
    width: 16px;
}
</style>