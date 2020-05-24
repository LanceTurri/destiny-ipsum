<template>
    <div class="ipsum" :class="`ipsum--${$route.params.character}`">
        <Generator :dialogue="dialogue" />
    </div>
</template>

<script>
import Vue from 'vue';
import Generator from '@/components/Generator.vue';

// Hardcoded data
import CAYDE from '@/data/cayde';
import DRIFTER from '@/data/drifter';
import SHAXX from '@/data/shaxx';
import VANCE from '@/data/vance';

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
                this.dialogue = translateScriptToFlatArray(CAYDE);
                break;

            case 'drifter':
                this.dialogue = translateScriptToFlatArray(DRIFTER);
                break;

            case 'vance':
                this.dialogue = translateScriptToFlatArray(VANCE);
                break;

            // Shaxx is the default
            case 'shaxx':
            default:
                this.dialogue = translateScriptToFlatArray(SHAXX);
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