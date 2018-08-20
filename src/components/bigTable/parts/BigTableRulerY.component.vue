<script>
	import { createNamespacedHelpers } from 'vuex';
	const { mapGetters, mapState } = createNamespacedHelpers('bigTable');

	export default {
		name: 'BigTableRulerY',
		methods: {
			/**
			 * Here we calculate [y] position for vertical ruler of bigTable
			 * @param rowIndex {number}
			 * @returns {number}
			 */
			rulerItemY(rowIndex) {
				return rowIndex * this.cell.height - this.bigTable.y;
			}
		},
		computed: {
			...mapState([
				'offset',
				'cell',
				'visible'
			]),
			...mapGetters([
				'bigTable',
				'tableHeight',
				'firstVisibleTableRow'
			])
		}
	}
</script>


<template type="text/x-template" id="big-table-ruler-y">
	<div class="big-table-ruler-y" :style="{
				height: visible.height - offset + 'px',
				width: offset + 'px' }">

		<div :style="{
			 width: offset + 'px',
			 height: tableHeight + 'px' }">

			<ul v-bind:key="rowIndex" v-for="(row, rowIndex) in visible.table">
				<li class="big-table-ruler-y-item"
					:style="{
						top: rulerItemY(rowIndex-1) + 'px',
						width: offset + 'px',
						height: cell.height + 'px' }">
					{{ rowIndex }}
				</li>
			</ul>
		</div>
	</div>
</template>


<style scoped>
	.big-table-ruler-y {
		overflow: hidden;
		position: relative;
	}

	.big-table-ruler-y-item {
		left: 0;
		writing-mode: vertical-rl;
		text-orientation: upright;
		display: flex;
		position: absolute;
		background: darkgrey;
		font-size: 12px;
	}
</style>

