<template>
    <div class="generator">
        <!-- TODO: Make this into a random greeting -->
        <h1>Anything you need, Guardian?</h1>
        <GeneratorForm
            :count="ipsumParagraphs.length"
            @generate="generateParagraph"
            @prune="ipsumParagraphs.pop()"></GeneratorForm>

        <transition-group tag="div" class="generator__content">
            <p
                class="generator__content-item"
                v-for="(paragraph, index) in ipsumParagraphs"
                :key="`${paragraph.replace(/\s/g, '-')}${index}`">{{ paragraph }}</p>
        </transition-group>
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
    created() {
        this.generateParagraph();
    },
    methods: {
        generateParagraph() {
            const randomizedLines = this.randomizeArray(this.$store.state.currentScript);
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
    margin-top: 10%;
    max-width: 600px;
    padding: 40px;
    width: 70%;
}

.generator__content {
    flex: 2 2 100%;
    overflow-y: auto;
}

.generator__content-item {
    padding-bottom: 16px;
}
</style>
