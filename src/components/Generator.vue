<template>
    <div class="generator" :class="`generator--${$route.params.character}`">
        <h1 class="generator__title">{{ greeting }}</h1>

        <transition-group tag="div" class="generator__content" name="paragraph-fade">
            <p
                class="generator__content-item"
                v-for="(paragraph, index) in ipsumParagraphs"
                :key="`${paragraph.replace(/\s/g, '-')}${index}`">{{ paragraph }}</p>
        </transition-group>

        <GeneratorForm
            :count="ipsumParagraphs.length"
            :copyText="stringifiedText"
            @generate="addParagraph"
            @prune="ipsumParagraphs.pop()"></GeneratorForm>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GeneratorForm from '@/components/GeneratorForm.vue';

// Custom greeting intros
import { CAYDE_INTROS } from '@/data/cayde';
import { DRIFTER_INTROS } from '@/data/drifter';
import { SHAXX_INTROS } from '@/data/shaxx';
import { VANCE_INTROS } from '@/data/vance';

export default Vue.extend({
    name: 'Generator',
    data: () => {
        return {
            greetings: [] as string[],
            ipsumParagraphs: [] as string[],
        };
    },
    props: {
        dialogue: {
            required: true,
            type: Array,
        },
    },
    computed: {
        greeting(): string {
            const randomIndex = Math.floor(Math.random() * (this.greetings.length - 0)) + 0;
            return this.greetings[randomIndex];
        },
        stringifiedText(): string {
            return this.ipsumParagraphs.join('\n\n');
        },
    },
    methods: {
        async addParagraph(numberOfParagraphs = 1) {
            this.generateParagraph(numberOfParagraphs);

            await this.$nextTick(); // Wait till Vue has injected the new paragraph

            const paragraphs = document.querySelectorAll('.generator__content-item');
            paragraphs[paragraphs.length - 1].scrollIntoView();
        },
        generateParagraph(numberOfParagraphs: number = 1) {
            const randomizedLines = this.randomizeArray(this.dialogue as string[]);
            // TODO: Add setting to begin with 'Lorem Ipsum Destiny'
            let paragraph = '';
            let index = 0;

            // TODO: Figure out a better way at limiting character count
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
            const isSmallScreen = window.screen.availWidth < 640;

            switch (this.$route.params.character) {
                case 'cayde':
                    root.style.setProperty('--generator-bkg-color', `rgba(102, 51, 48, ${isSmallScreen ? '0.92' : '0.98'})`);
                    root.style.setProperty('--generator-main-color', '#f5f5f5');
                    root.style.setProperty('--generator-hover-color', '#333333');
                    root.style.setProperty('--generator-box-shadow',
                        '20px 20px 60px #572b29, -20px -20px 60px #753b37');
                    break;

                case 'drifter':
                    root.style.setProperty('--generator-bkg-color', `rgba(16, 42, 32, ${isSmallScreen ? '0.9' : '0.96'})`);
                    root.style.setProperty('--generator-main-color', '#d5d5d5');
                    root.style.setProperty('--generator-hover-color', '#333333');
                    root.style.setProperty('--generator-box-shadow',
                        '20px 20px 60px #0e241b, -20px -20px 60px #123025');
                    break;

                case 'vance':
                    root.style.setProperty('--generator-bkg-color', `rgba(228, 222, 86, ${isSmallScreen ? '0.9' : '0.97'})`);
                    root.style.setProperty('--generator-main-color', '#333333');
                    root.style.setProperty('--generator-hover-color', '#f5f5f5');
                    root.style.setProperty('--generator-box-shadow',
                        '20px 20px 40px #c2bd49, -20px -20px 40px #ffff63');
                    break;

                case 'shaxx':
                default:
                    root.style.setProperty('--generator-bkg-color', `rgba(155, 31, 23, ${isSmallScreen ? '0.8' : '0.95'})`);
                    root.style.setProperty('--generator-main-color', '#f5f5f5');
                    root.style.setProperty('--generator-hover-color', '#333333');
                    root.style.setProperty('--generator-box-shadow',
                        '20px 20px 60px #841a14, -20px -20px 60px #b2241a');
                    break;
            }
        },
        setGreetings() {
            const characterName = this.$route.params.character;

            switch (characterName) {
                case 'cayde':
                    this.greetings = CAYDE_INTROS;
                    break;

                case 'drifter':
                    this.greetings = DRIFTER_INTROS;
                    break;

                case 'vance':
                    this.greetings = VANCE_INTROS;
                    break;

                case 'shaxx':
                default:
                    this.greetings = SHAXX_INTROS;
                    break;
            }
        },
    },
    created() {
        this.addParagraph(2);
        this.setCssVariables();
        this.setGreetings();
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
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 32px;
    width: 100%;
}

@media (min-width: 640px) {
    .generator {
        border-radius: 16px;
        height: auto;
        max-height: 80vh;
        max-width: 600px;
        padding: 32px 40px;
        width: 96%;
    }
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

// Paragraph Fade Animation
.paragraph-fade-enter-active,
.paragraph-fade-leave-active {
    transition: all 300ms linear;
}

.paragraph-fade-enter,
.paragraph-fade-leave-to {
    opacity: 0;
}
</style>
