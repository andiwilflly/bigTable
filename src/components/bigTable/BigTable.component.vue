<script>
import { createNamespacedHelpers } from 'vuex';
import BigTableHeader from '@/components/bigTable/parts/BigTableHeader.component';
import BigTableCell from '@/components/bigTable/parts/BigTableCell.component';
import BigTableRulerX from '@/components/bigTable/parts/BigTableRulerX.component';
import BigTableRulerY from '@/components/bigTable/parts/BigTableRulerY.component';


// Define namespace module [bigTable]
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('bigTable');


export default {
	name: 'BigTable',
	components: {
		BigTableHeader,
		BigTableCell,
		BigTableRulerX,
		BigTableRulerY
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
		/**
		 * Generate key for [bigTAble] row
		 * @param row {Object}
		 * @param rowIndex {number}
		 * @returns {string}
		 * */
		rowIndexKey(row, rowIndex) {
			return `${Object.keys(row).join('_')}_${rowIndex}`;
		},
		onWindowResize () { this.onWindowResizeAction(); },
		/**
		 * Here we make deferred call of [setAxesAction] action for better performance
		 * @param e {Object}
		 * @returns {*}
		 */
		onTableScroll (e) {
			this.setAxesAction({ x: e.target.scrollLeft, y: e.target.scrollTop });
		}
	},
	computed: {
		...mapState([
			'visible'
		]),
		...mapGetters([
			'bigTable',
			'tableWidth',
			'tableHeight'
		])
	}
}
</script>

<style scoped src='@/components/bigTable/BigTable.styles.css'></style>
<template src='@/components/bigTable/BigTable.template.vue'></template>


