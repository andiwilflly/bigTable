<template type="text/x-template" id="big-table-template">

	<div class="big-table">

		<BigTableHeader />

		<BigTableRulerX />

		<div class="big-table-wrapper">

			<BigTableRulerY />

			<div class="big-table-container" v-on:scroll="onTableScroll" :style="{
				width: visible.width + 'px',
				height: visible.height + 'px' }">
				<div class="big-table-inner" :style="{
					 width: tableWidth + 'px',
					 height: tableHeight + 'px'}">
					<ul v-bind:key="rowIndexKey(row, rowIndex)" v-for="(row, rowIndex) in visible.table">
						<BigTableCell v-for="item in row" :item="item" :rowIndex="rowIndex" />
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
