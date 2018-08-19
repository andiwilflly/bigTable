import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger';
// Models
import bigTableModule from '@/modules/bigTable/bigTable.module';


Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [createLogger({})],
	state: {},

	modules: {
		bigTable: {
			namespaced: true,
			...bigTableModule
		}
	}
})
