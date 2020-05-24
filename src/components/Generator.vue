<template>
    <div class="generator">
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
        this.generateParagraph();
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
        generateParagraph() {
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
    },
    components: {
        GeneratorForm,
    },
});
</script>

<style scoped lang="scss">
.generator {
    align-self: start;
    background-color: rgba(255, 255, 255, 0.97);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    margin-top: 10vh;
    max-height: 80vh;
    max-width: 600px;
    padding: 32px 40px;
    width: 96%;
}

.generator__title {
    border-bottom: 2px solid #333;
    padding-bottom: 8px;
}

.generator__content {
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
