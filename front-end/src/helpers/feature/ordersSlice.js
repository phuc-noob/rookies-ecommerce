import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	data: [],
	loading: true,
	filter: {},
	sort: {},
	page: 0,
	size: 100,
	action: {
		id: null,
		loading: false,
	},
};

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setData(state, action) {
			const { data, filter, sort, page, size } = action.payload;
			return {
				...state,
				data,
				filter,
				sort,
				page,
				size,
			};
		},
		setAction(state, action) {
			const { id, loading } = action.payload;
			state.action = {
				...state.action,
				id,
				loading,
			};
		},
	},
});

export default ordersSlice.reducer;
export const ordersAction = ordersSlice.actions;
export const initOrdersState = initialState;
