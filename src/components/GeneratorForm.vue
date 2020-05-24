<template>
    <div class="generator-form">
        <div class="generator-form__wrapper">
            <router-link
                class="generator-form__button generator-form__button--ghost generator-form__about"
                tag="button"
                to="/about"
                type="button"
                >About</router-link>
        </div>

        <div class="generator-form__count">
            <button
                class="generator-form__button generator-form__button--border"
                type="button"
                @click="$emit('prune')">

                <svg class="generator-form__button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M417.4 224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32h322.8c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z"/></svg>
            </button>

            <div class="generator-form__count-text">{{ count }}</div>

            <button
                class="generator-form__button generator-form__button--border"
                type="button"
                @click="$emit('generate')">

                <svg class="generator-form__button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M417.4 224H288V94.6c0-16.9-14.3-30.6-32-30.6s-32 13.7-32 30.6V224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32H224v129.4c0 16.9 14.3 30.6 32 30.6s32-13.7 32-30.6V288h129.4c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z"/></svg>
            </button>
        </div>

        <div class="generator-form__wrapper">
            <button ref="copyButton" type="button" class="generator-form__button generator-form__button--ghost generator-form__copy">
                Copy
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ClipboardJS from 'clipboard';

export default Vue.extend({
    name: 'GeneratorForm',
    data: () => {
        return {
            clipboard: {} as ClipboardJS,
        };
    },
    props: {
        count: {
            type: Number,
            required: true,
        },
        copyText: {
            type: String,
            required: true,
        },
    },
    mounted() {
        this.$nextTick(() => {
            // Create clipboard JS instance
            this.clipboard = new ClipboardJS(this.$refs.copyButton as HTMLButtonElement, {
                text: () => this.copyText,
            });

            this.clipboard.on('success', () => {
                const copyButton = this.$refs.copyButton as HTMLButtonElement;
                copyButton.textContent = 'Copied!';

                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        });
    },
    beforeDestroy() {
        this.clipboard.destroy();
    },
});
</script>

<style lang="scss" scoped>
.generator-form {
    align-items: center;
    border-top: 2px solid var(--generator-main-color);
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    padding-top: 16px;
}

.generator-form__wrapper {
    display: flex;
    width: 33.3333333%;

    &:first-child {
        justify-content: flex-start;
    }

    &:last-child {
        justify-content: flex-end;
    }
}

.generator-form__button {
    align-items: center;
    background: none;
    border: none;
    color: var(--generator-main-color);
    cursor: pointer;
    display: flex;
    height: 28px;
    justify-content: center;
    opacity: 0.8;
    padding: 6px;
    text-shadow: none;
    transition: 200ms all linear;
    user-select: none;

    &:hover {
        background-color: var(--generator-main-color);
        color: var(--generator-hover-color);
        opacity: 1.0;

        svg {
            fill: var(--generator-hover-color);
        }
    }

    &--border {
        border: 2px solid var(--generator-main-color);
        border-radius: 28px;
        width: 28px;
    }

    &--ghost {
        border: 2px solid white;
        border-radius: 28px;
        height: auto;
        line-height: 1;
        padding: 8px 12px;
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
    align-items: center;
    display: flex;
    flex-shrink: 0;
}

.generator-form__count-text {
    color: var(--generator-main-color);
    font-weight: 700;
    padding: 0 16px;
}
</style>