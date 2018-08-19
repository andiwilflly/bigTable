import { expect } from 'chai';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
// Models
import bigTableModule from '@/modules/bigTable/bigTable.module';


const localVue = createLocalVue();

localVue.use(Vuex);

describe('bigTable.module', () => {
	let store;

	beforeEach(() => {
		store = new Vuex.Store({
			state: {},
			modules: {
				bigTable: {
					namespaced: true,
					...bigTableModule
				}
			}
		})
	});


	it('updateState', () => {
		store.commit('bigTable/updateState', { size: 40001, visible: { height: 200 } });
		expect(store.state.bigTable.size).to.equal(40001);
		expect(store.state.bigTable.visible.height).to.equal(200);
	});

	it('updateValuesTable', () => {
		store.dispatch('bigTable/updateValuesTable', {
			id: 1,
			value: 'testValue'
		});

		expect(store.state.bigTable.valuesTable[1].value).to.equal('testValue');
	});

	it('setAxes', () => {
		expect(store.state.bigTable.x).to.equal(0);
		expect(store.state.bigTable.y).to.equal(0);

		store.dispatch('bigTable/setAxes', { x: 42, y: 2000 });

		expect(store.state.bigTable.x).to.equal(42);
		expect(store.state.bigTable.y).to.equal(2000);
	});

	it('redrawVisibleTable', () => {
		store.dispatch('bigTable/setAxes', { x: 2000, y: 2000 });
		store.dispatch('bigTable/updateValuesTable', {
			id: 480015,
			value: 'hello from 480015!'
		});

		expect(store.state.bigTable.visible.table[13][3].id).to.equal(480015);
		expect(store.state.bigTable.visible.table[13][3].value).to.equal('hello from 480015!');
		expect(store.state.bigTable.visible.table[13][3].index).to.equal(3);

	});
});
