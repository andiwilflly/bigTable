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
					...bigTableModule,
					state: {
						size: 40000,
						offset: 15,
						x: 0,
						y: 0,
						visible: {
							width: window.innerWidth - 30,
							height: window.innerHeight / 1.5,
							table: {}
						},
						cell: {
							width: 200,
							height: 170
						},
						valuesTable: {}
					}
				}
			}
		})
	});


	it('updateState', () => {
		store.commit('bigTable/updateState', { size: 40001, visible: { height: 200 } });
		expect(store.state.bigTable.size).to.equal(40001);
		expect(store.state.bigTable.visible.height).to.equal(200);

		store.dispatch('bigTable/setAxes', { x: 0, y: 1000 });
		store.dispatch('bigTable/updateValuesTable', {
			id: 280011,
			value: 'value for 280011'
		});

		expect(store.state.bigTable.visible.table[8][4].id).to.equal(280011);
		expect(store.state.bigTable.visible.table[8][4].value).to.equal('value for 280011');
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
			id: 480010,
			value: 'hello from 480010!'
		});

		expect(store.state.bigTable.visible.table[13][10].id).to.equal(480010);
		expect(store.state.bigTable.visible.table[13][10].value).to.equal('hello from 480010!');
		expect(store.state.bigTable.visible.table[13][10].index).to.equal(10);

	});
});
