<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('bigTable');


export default {
	name: 'BigTableCell',
	data() {
		return {
			inputValue: '',
			checkboxValue: false
		}
	},
	created: function () {
		// Fill local [data] with values from [bigTable.valuesTable] if its possible
		const valuesItem = this.valuesTable[this.item.id];
		this.inputValue = valuesItem ? valuesItem.value : '';
		this.checkboxValue = valuesItem ? valuesItem.isDisabled : false;
	},
	props: {
		rowIndex: String,
		item: Object
	},
	methods: {
		...mapActions({
			updateValuesTableAction: 'updateValuesTable'
		}),
		onTableCheckboxChange(e) {
			this.checkboxValue = e.target.checked;
		},
		/**
		 * Validate [input] value. Input can contain only numbers
		 * Change input value via $refs,
		 * because we need to re-render template even when new and old value of input is the same
		 * @param e {Object|required}
		 * @return void
		 */
		onTableItemChange(e) {
			this.inputValue = e.target.value.replace(/\D/g, '').trim();
			this.$refs.itemInput.value = this.inputValue;
		},
		/**
		 * Save changes of current [cell] to [bigTable.valuesTable]
		 * @param e {Object|required}
		 * @returns void
		 */
		onSaveBtnClick(e) {
			this.updateValuesTableAction({
				id: e.target.id,
				value: this.inputValue,
				isDisabled: this.checkboxValue
			});
		}
	},
	computed: {
		...mapState([
			'cell',
			'size',
			'valuesTable'
		]),
		/**
		 * Calculate [top] position of current [cell]
		 * @returns {number}
		 * */
		positionTop() {
			const row = Math.ceil(this.item.id / this.size) - 1;
			return row * this.cell.height;
		},
		/**
		 * Calculate [left] position of current [cell]
		 * @returns {number}
		 * */
		positionLeft() {
			const row = Math.ceil(this.item.id / this.size);
			const numberInRow = this.size - (row * this.size - this.item.id) - 1;
			return numberInRow * this.cell.width;
		},
		/**
		 * Here we compare local [data] and data from [store]
		 * Based on the results of the comparison, we show or hide the save button
		 * @returns {boolean}
		 */
		isEqualTableData() {
			return this.checkboxValue === this.item.isDisabled && this.inputValue === this.item.value;
		}
	}
}
</script>


<template type="text/x-template" id="big-table-cell-template">
	<li class="big-table-cell"
		v-bind:key="item.id"
		v-bind:style="{
			top: positionTop + 'px',
			left: positionLeft + 'px',
			width: cell.width + 'px',
			height: cell.height + 'px' }">
		<p>row: {{ rowIndex }}</p>
		<p>index: {{ item.index }}</p>
		<p>id: {{ item.id }}</p>
		<p>value: {{ item.value }}</p>
		<p>isDisabled: {{ item.isDisabled }}</p>
		<p>checkboxValue: {{ checkboxValue }}</p>
		<p>inputValue: {{ inputValue }}</p>
		<p>isEqualTableData: {{ isEqualTableData }}</p>
		<input type="checkbox" :checked="isEqualTableData ? item.isDisabled : checkboxValue" @change="onTableCheckboxChange">
		<input type="text" ref="itemInput" :disabled="item.isDisabled" v-bind:value="isEqualTableData ? item.value : inputValue" @input="onTableItemChange">

		<button v-if="!isEqualTableData" :disabled="isEqualTableData" @click="onSaveBtnClick" :id="item.id">
			Save changes
		</button>
	</li>
</template>


<style scoped>
	.big-table-cell {
		box-sizing: border-box;
		border: 1px solid darkgray;
		position: absolute;
		background: #378f62;
		text-align: left;
		padding: 10px;
		overflow: hidden;
		font-weight: bold;
	}

	.big-table-cell p {
		margin: 0;
		color: whitesmoke;
	}

	.big-table-cell input {
		outline: none;
		margin-left: 0;
	}

	.big-table-cell input:disabled {
		opacity: 0.5;
	}
</style>

