import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	authLoading: true,
	isAuthenticated: false,
	authorization: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth(state, action) {
			const { user } = action.payload;
			return {
				...state,
				authLoading: false,
				user,
				isAuthenticated: user != null,
				authorization: user == null ? null : user.roleName,
			};
		},
		loadingAuth(state) {
			return {
				...state,
				authLoading: true,
			};
		},
		logout(state) {
			return {
				...state,
				isAuthenticated: false,
				user: null,
				authorization: null,
			};
		},
	},
});

export default authSlice.reducer;
export const authAction = authSlice.actions;
export const initAuthState = initialState;
