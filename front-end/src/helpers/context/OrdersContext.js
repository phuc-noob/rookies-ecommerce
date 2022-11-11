import { ordersService } from "../service/ordersService";
import { OrderService } from "../service/orderService";
import { createContext, useReducer } from "react";
import orderReducer, {
	initOrdersState,
	ordersAction,
} from "../feature/ordersSlice";

export const OrdersContext = createContext();

function OrdersContextProvider({ children }) {
	const [ordersState, dispatch] = useReducer(orderReducer, initOrdersState);

	const loadListOrders = async ({ page, size, filter }) => {
		dispatch(ordersAction.setLoading(true));
		try {
			const data = await OrderService.getOrders();
			const list = {
				data,
				page,
				size,
				filter,
			};
			dispatch(ordersAction.setData(list));
		} catch (err) {
			console.log("err", err);
		}
		dispatch(ordersAction.setLoading(false));
	};

	const refreshList = async () => {
		await loadListOrders(ordersState);
	};
	const acceptOrder = async (id) => {
		dispatch(ordersAction.setAction({ id, loading: true }));
		try {
			await ordersService.setAcceptOrder(id);
			await refreshList();
		} catch (err) {
			console.log("err", err);
		}
		dispatch(ordersAction.setAction({ id: null, loading: false }));
	};
	const rejectOrder = async (id) => {
		dispatch(ordersAction.setAction({ id, loading: true }));
		try {
			await ordersService.setRejectOrder(id);
			await refreshList();
		} catch (err) {
			console.log("err", err);
		}
		dispatch(ordersAction.setAction({ id: null, loading: false }));
	};

	const value = {
		ordersState,
		loadListOrders,
		refreshList,
		acceptOrder,
		rejectOrder,
	};
	return (
		<OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
	);
}

export default OrdersContextProvider;
