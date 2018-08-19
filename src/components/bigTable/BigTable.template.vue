<template type="text/x-template" id="big-table-template">

	<div class="big-table">

		<BigTableHeader />

		<div class="big-table-container" v-on:scroll="onTableScroll" :style="{ width: visible.width + 'px', height: visible.height + 'px' }">
			<div class="big-table-inner" :style="{
				 width: tableWidth + offset + 'px',
				 height: tableHeight + offset + 'px'
			}">
				<div v-bind:key="'x' + index" v-for="(item, index) in firstVisibleTableRow"
					 class="big-table-ruler-x"
					 v-bind:style="{
                        top: bigTable.y + 'px',
                        left: rulerXPositionLeft(item.index) + 'px',
                        height: offset + 'px',
                        width: cell.width + 'px' }">
					{{ item.index }}
				</div>

				<ul v-bind:key="rowIndex" v-for="(row, rowIndex) in visible.table">
					<li class="big-table-ruler-y"
						v-bind:style="{
                            left: bigTable.x + 'px',
                            top: rulerYPositionTop(rowIndex-1) + 'px',
                            width: offset + 'px',
                            height: cell.height + 'px' }">
                        {{ rowIndex }}
                    </li>

					<BigTableCell v-for="item in row" :item="item" :rowIndex="rowIndex" />
				</ul>
			</div>
		</div>
	</div>
</template>
