<template>
    <div class="ipsum" :class="`ipsum--${$route.params.character}`">
        <Generator :dialogue="dialogue" />
    </div>
</template>

<script>
import Vue from 'vue';
import Generator from '@/components/Generator.vue';

// Hardcoded data
import { CAYDE_DIALOGUE } from '@/data/cayde';
import { DRIFTER_DIALOGUE } from '@/data/drifter';
import { SHAXX_DIALOGUE } from '@/data/shaxx';
import { VANCE_DIALOGUE } from '@/data/vance';

// Utility functions
import { translateScriptToFlatArray } from '@/utils/translateScriptToFlatArray';


export default Vue.extend({
    data: () => {
        return {
            dialogue: {},
        };
    },
    created() {
        switch (this.$route.params.character) {
            case 'cayde':
                this.dialogue = translateScriptToFlatArray(CAYDE_DIALOGUE);
                break;

            case 'drifter':
                this.dialogue = translateScriptToFlatArray(DRIFTER_DIALOGUE);
                break;

            case 'vance':
                this.dialogue = translateScriptToFlatArray(VANCE_DIALOGUE);
                break;

            // Shaxx is the default
            case 'shaxx':
            default:
                this.dialogue = translateScriptToFlatArray(SHAXX_DIALOGUE);
                break;
        }
    },
    components: {
        Generator,
    },
});
</script>

<style lang="scss" scoped>
.ipsum {
    align-items: center;
    background-size: cover;
    background-position: center;
    display: flex;
    height: 100%;
    justify-content: center;

    &--cayde {
        background-image: url('../assets/cayde.jpg');
    }

    &--drifter {
        background-image: url('../assets/drifter.jpg');
    }

    &--shaxx {
        background-image: url('../assets/shaxx.jpg');
    }

    &--vance {
        background-image: url('../assets/vance.jpg');
    }
}
</style>