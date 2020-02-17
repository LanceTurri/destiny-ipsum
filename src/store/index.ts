import Vue from 'vue';
import Vuex from 'vuex';

// Hardcoded data
import { shaxx } from '@/data/shaxx';

// Utility functions
import { translateScriptToFlatArray } from '@/utils/translateScriptToFlatArray';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentScript: [] as string[],
    },
    mutations: {
        populateScriptArray(state, payload: string[]) {
            state.currentScript = payload;
        },
    },
    actions: {
        createInitialData(context) {
            const scriptArray = translateScriptToFlatArray(shaxx);
            context.commit('populateScriptArray', scriptArray);
        },
    },
});
