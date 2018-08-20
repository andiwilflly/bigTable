<script>
	import { createNamespacedHelpers } from 'vuex';
	const { mapGetters, mapState } = createNamespacedHelpers('bigTable');

	export default {
		name: 'BigTableRulerX',
		methods: {
			/**
			 * Here we calculate [x] position for vertical ruler of bigTable
			 * @param index {number}
			 * @returns {number}
			 */
			rulerItemX(index) {
				return this.cell.width * index - this.bigTable.x;
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
				'tableWidth',
				'firstVisibleTableRow'
			])
		}
	}
</script>


<template type="text/x-template" id="big-table-ruler-x">
	<div class="big-table-ruler-x" :style="{
		 width: visible.width - offset + 'px',
		 height: offset + 'px',
		 left: offset + 'px' }">

		<div :style="{
			 width: tableWidth + 'px',
			 height: offset + 'px'}">

			<div v-bind:key="'x' + index" v-for="(item, index) in firstVisibleTableRow"
				 class="big-table-ruler-x-item"
				 :style="{
						top: '0px',
						left: rulerItemX(index-1) + 'px',
						height: offset + 'px',
						width: cell.width + 'px' }">
				{{ item.index }}
			</div>
		</div>
	</div>
</template>


<style scoped>
	.big-table-ruler-x {
		overflow: hidden;
		position: relative;
	}

	.big-table-ruler-x-item {
		display: flex;
		position: absolute;
		background: darkgrey;
		font-size: 12px;
	}
</style>

