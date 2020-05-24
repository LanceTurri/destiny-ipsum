<template>
    <div class="generator" :class="`generator--${$route.params.character}`">
        <h1 class="generator__title">{{ greeting }}</h1>

        <transition-group tag="div" class="generator__content" name="fade">
            <p
                class="generator__content-item"
                v-for="(paragraph, index) in ipsumParagraphs"
                :key="`${paragraph.replace(/\s/g, '-')}${index}`">{{ paragraph }}</p>
        </transition-group>

        <GeneratorForm
            :count="ipsumParagraphs.length"
            @generate="generateParagraph"
            @prune="ipsumParagraphs.pop()"></GeneratorForm>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GeneratorForm from '@/components/GeneratorForm.vue';

export default Vue.extend({
    name: 'Generator',
    data: () => {
        return {
            ipsumParagraphs: [] as string[],
        };
    },
    props: {
        dialogue: {
            required: true,
            type: Array,
        },
    },
    created() {
        this.generateParagraph(2);
        this.setCssVariables();
    },
    computed: {
        greeting(): string {
            const greetings = [
                'What do you need?',
                'No need to be polite.',
                'Let\'s do this.',
                'The honor is mine, Hivebane.',
                'The slayer of Oryx.',
                'Now You\'re ready to get to work.',
                'Keep it up, Guardian.',
                'Tick, tock. Get rolling.',
            ];

            const randomIndex = Math.floor(Math.random() * (greetings.length - 0)) + 0;
            return greetings[randomIndex];
        },
    },
    methods: {
        generateParagraph(numberOfParagraphs: number = 1) {
            const randomizedLines = this.randomizeArray(this.dialogue as string[]);
            // TODO: Add setting to being with 'Lorem Ipsum Destiny'
            let paragraph = '';
            let index = 0;

            // TODO: Figure out a better way at limiting character count
            // TODO: Take into account a user setting for length of paragraphs
            while (paragraph.split('').length < 300) {
                paragraph += ` ${randomizedLines[index]}`;
                index++;
            }

            this.ipsumParagraphs.push(paragraph);

            if (numberOfParagraphs !== 1) {
                this.generateParagraph(numberOfParagraphs - 1);
            }
        },
        randomizeArray(array: string[]) {
            // Now we randomize the array to assist with the grouping later
            const arrayClone = array.slice();
            let currentIndex = array.length - 1;
            let randomIndex = 0;
            let temporaryArrayString = '';

            // Let's randomize this array!
            while (currentIndex !== 0) {
                // Get a random number
                randomIndex = Math.floor(Math.random() * currentIndex);

                // Store temporary value from the current index
                temporaryArrayString = array[currentIndex];

                // Set the current index with the random index number
                array[currentIndex] = array[randomIndex];

                // Set the temporary index to the random index that was just used
                array[randomIndex] = temporaryArrayString;

                // Decrement index
                currentIndex -= 1;
            }

            return arrayClone;
        },
        setCssVariables() {
            const root = document.documentElement;

            switch (this.$route.params.character) {
                case 'cayde':
                    root.style.setProperty('--generator-bkg-color', 'rgba(102, 51, 48, 1)');
                    root.style.setProperty('--generator-main-color', '#f5f5f5');
                    root.style.setProperty('--generator-hover-color', '#333333');
                    root.style.setProperty('--generator-box-shadow',
                        '20px 20px 60px #572b29, -20px -20px 60px #753b37');
                    break;

                case 'drifter':
                    root.style.setProperty('--generator-bkg-color', 'rgba(16, 42, 32, 0.96)');
                    root.style.setProperty('--generator-main-color', '#d5d5d5');
                    root.style.setProperty('--generator-hover-color', '#333333');
                    root.style.setProperty('--generator-box-shadow',
                        '20px 20px 60px #0e241b, -20px -20px 60px #123025');
                    break;

                case 'vance':
                    root.style.setProperty('--generator-bkg-color', 'rgba(228, 222, 86, 0.97)');
                    root.style.setProperty('--generator-main-color', '#333333');
                    root.style.setProperty('--generator-hover-color', '#f5f5f5');
                    root.style.setProperty('--generator-box-shadow',
                        '20px 20px 40px #c2bd49, -20px -20px 40px #ffff63');
                    break;

                case 'shaxx':
                default:
                    root.style.setProperty('--generator-bkg-color', 'rgba(155, 31, 23, 0.95)');
                    root.style.setProperty('--generator-main-color', '#f5f5f5');
                    root.style.setProperty('--generator-hover-color', '#333333');
                    root.style.setProperty('--generator-box-shadow',
                        '20px 20px 60px #841a14, -20px -20px 60px #b2241a');
                    break;
            }
        },
    },
    components: {
        GeneratorForm,
    },
});
</script>

<style scoped lang="scss">
.generator {
    background-color: var(--generator-bkg-color);
    box-shadow: var(--generator-box-shadow);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    max-height: 80vh;
    max-width: 600px;
    padding: 32px 40px;
    width: 96%;
}

.generator__title {
    color: var(--generator-main-color);
    border-bottom: 2px solid var(--generator-main-color);
    padding-bottom: 8px;
}

.generator__content {
    color: var(--generator-main-color);
    flex: 2 2 100%;
    overflow-y: auto;
    margin: 24px 0;
}

.generator__content-item {
    &:not(:first-child) {
        padding-top: 24px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 300ms linear;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
