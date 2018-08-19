<script>
import { createNamespacedHelpers } from 'vuex';
import BigTableHeader from '@/components/bigTable/BigTableHeader.component';
import BigTableCell from '@/components/bigTable/BigTableCell.component';

// Define namespace module [bigTable]
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('bigTable');


export default {
	name: 'BigTable',
	timeout: null,
	components: {
		BigTableHeader,
		BigTableCell
	},
	created: function () {
		// Draw [bigTable] for the first time
		this.redrawVisibleTableAction();
		window.addEventListener('resize', this.onWindowResize);
	},
	destroyed: function() {
		window.removeEventListener('resize', this.onWindowResize);
	},
	methods: {
		...mapActions({
			setAxesAction: 'setAxes',
			redrawVisibleTableAction: 'redrawVisibleTable',
			onWindowResizeAction: 'onWindowResize'
		}),
		onWindowResize () {
			this.onWindowResizeAction();
		},
		/**
		 * Here we make deferred call of [setAxesAction] action for better performance
		 * @param e {DocumentEvent}
		 * @returns {*}
		 */
		onTableScroll (e) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.setAxesAction({ x: e.target.scrollLeft, y: e.target.scrollTop });
			}, 100);
		},
		/**
		 * Here we calculate [y] position of vertical ruler of bigTable
		 * @param row {number}
		 * @returns {number}
		 */
		rulerYPositionTop (row) {
			return row * this.cell.height + this.offset;
		},
		/**
		 * Here we calculate [x] position of horizontal ruler of bigTable
		 * @param id {number}
		 * @returns {number}
		 */
		rulerXPositionLeft (id) {
			const row = Math.ceil(id / this.size);
			const numberInRow = this.size - (row * this.size - id) - 1;
			return numberInRow * this.cell.width + this.offset;
		}
	},
	computed: {
		...mapState([
			'offset',
			'size',
			'cell',
			'visible'
		]),
		...mapGetters([
			'bigTable',
			'tableWidth',
			'tableHeight',
			'firstVisibleTableRow'
		])
	}
}
</script>

<style scoped src='@/components/bigTable/BigTable.styles.css'></style>
<template src='@/components/bigTable/BigTable.template.vue'></template>


