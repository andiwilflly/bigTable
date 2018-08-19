import Vue from 'vue';

let timeout = null;
export default {

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
	},
	mutations: {
		updateState(state, newState = {}) {
			const names = Object.keys(newState);
			names.forEach((name) => {
				if (typeof newState[name] !== 'object') return Vue.set(state, name, newState[name]);
				Vue.set(state, name, { ...state[name], ...newState[name] });
			});
		},
		updateValuesTable(state, { id, value, isDisabled = false }) {
			// Mutate [valuesTable] with new [values]
			const oldValue = state.valuesTable[id] ? state.valuesTable[id].value : undefined;
			Vue.set(state.valuesTable, id, {
				value: value === undefined ? oldValue : value, // New value was not set
				isDisabled // if no new value provided, set to [false]
			});
		},
		setAxes(state, { x, y }) {
			state.x = x;
			state.y = y;
		},
		redrawVisibleTable(state, { rows, cells }) {
			// Clear old [bigTable.visible.table]
			state.visible.table = {};
			for (let row of rows) {
				// Create visible rows of our new [bigTable.visible.table]
				Vue.set(state.visible.table, row, {});

				for (let cell of cells) {
					const id = cell + (row - 1) * state.size;
					// Create visible cells of our new [bigTable.visible.table]
					Vue.set(state.visible.table[row], cell, {
						index: cell,
						id,
						value: state.valuesTable[id] ? state.valuesTable[id].value : '',
						isDisabled: state.valuesTable[id] ? state.valuesTable[id].isDisabled : false
					});
				}
			}
		},
		onWindowResize(state) {
			// Set default [bigTable] visible size
			state.visible.width = window.innerWidth - 30;
			state.visible.height = window.innerHeight / 1.5;
		}
	},
	actions: {
		/**
		 * This action is for test usage (change default bigTable parameters)
		 * @param context {Object|required}
		 * @param newState {Object|required}
		 */
		updateState(context, newState = {}) {
			window.clearTimeout(timeout);
			timeout = window.setTimeout(() => {
				context.commit('updateState', newState);
				context.dispatch('redrawVisibleTable');
			}, 1000);
		},
		/**
		 * @param context {Object|required}
		 * @param id {string|required}
		 * @param value {string|optional}
		 * @param isDisabled {boolean|optional}
		 */
		updateValuesTable(context, { id, value, isDisabled = false }) {
			context.commit('updateValuesTable', {id, value, isDisabled});
			context.dispatch('redrawVisibleTable');
			console.log('modified data:', JSON.parse(JSON.stringify(this.state.bigTable.valuesTable)));
		},
		/**
		 * @param context {Object|required}
		 * @param x {number|required}
		 * @param y {number|required}
		 */
		setAxes(context, { x, y }) {
			context.commit('setAxes', { x, y });
			context.dispatch('redrawVisibleTable');
		},
		/**
		 * The main logic of [bigTable] visible part is here
		 * Here we recreate [bigTable.visible.table] rows and cells
		 * @param state {Object|required}
		 * @param commit {function|required}
		 */
		redrawVisibleTable({ state, commit }) {
			// Calculate visible part of [bigTable] rows and cells
			const visibleRows = Math.ceil(state.visible.height / state.cell.height);
			const visibleCells = Math.ceil(state.visible.width / state.cell.width);

			// Need to calculate first row of current visible [bigTable] part
			const startRow = Math.ceil(state.y / state.cell.height);
			// Fill [rows] array with [visible] rows indexes
			const rows = [];
			for (let i = startRow; i <= (visibleRows + startRow); i++) {
				if (i <= state.size && i > 0) rows.push(i); // Fill array only with valid row indexes
			}

			// Need to calculate first [cell index in row] of current visible [bigTable] part
			const startPos = Math.ceil(state.x / state.cell.width);
			// Fill [cells] array with [visible] cells indexes
			const cells = [];
			for (let i = startPos; i <= (visibleCells + startPos); i++) {
				if (i <= state.size && i > 0) cells.push(i); // Fill array only with valid cell indexes
			}
			commit('redrawVisibleTable', { rows, cells });
		},
		onWindowResize({ commit }) {
			commit('onWindowResize');
			context.dispatch('redrawVisibleTable');
		}
	},
	getters: {
		bigTable(state) { return state },
		tableWidth(state) { return state.size * state.cell.width; },
		tableHeight(state) { return state.size * state.cell.height; },
		firstVisibleTableRow(state) { return state.visible.table[Object.keys(state.visible.table)[0]]; }
	}
};
