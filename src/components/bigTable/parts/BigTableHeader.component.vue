<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('bigTable');

export default {
	name: 'BigTableHeader',
	methods: {
		...mapActions(['updateState']),
		onChangeBigTableSize(e) {
			if (+e.target.value > 100000) return; // Too big size. Potential performance issues
			this.updateState({ size: +e.target.value });
		},
		onChangeBigTableVisibleWidth(e) {
			this.updateState({ visible: { width: +e.target.value } });
		},
		onChangeBigTableVisibleHeight(e) {
			this.updateState({ visible: { height: +e.target.value } });
		},
		onChangeBigTableCellWidth(e) {
			if (+e.target.value <= 100) return; // Too small cells. Potential performance issues
			this.updateState({ cell: { width: +e.target.value } });
		},
		onChangeBigTableCellHeight(e) {
			if (+e.target.value <= 100) return; // Too small cells. Potential performance issues
			this.updateState({ cell: { height: +e.target.value } });
		}
	},
	computed: {
		...mapGetters(['bigTable'])
	}
}
</script>

<template type="text/x-template" id="big-table-template-header">
	<div>
		<p>size: {{ bigTable.size }}x{{ bigTable.size }}</p>
		<p>x: {{ bigTable.x }}px / y: {{ bigTable.y }}px</p>
		<p>
			(plz enter value less than 100000)
			<input type="number" :value="bigTable.size" @input="onChangeBigTableSize"><br>
		</p>
		<p>
			Visible width:
			<input type="number" :value="bigTable.visible.width" @input="onChangeBigTableVisibleWidth"><br>
			Visible height:
			<input type="number" :value="bigTable.visible.height" @input="onChangeBigTableVisibleHeight">
		</p>
		<p>
			Cell width: (plz enter value more than 100px)
			<input type="number" :value="bigTable.cell.width" @input="onChangeBigTableCellWidth"> <br>
			Cell height: (plz enter value more than 100px)
			<input type="number" :value="bigTable.cell.height" @input="onChangeBigTableCellHeight">
		</p>
	</div>
</template>


