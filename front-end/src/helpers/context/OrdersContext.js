import { ordersService } from "../service/ordersService";
import { createContext, useReducer } from "react";
import orderReducer, {
	initOrdersState,
	ordersAction,
} from "../feature/ordersSlice";

export const OrdersContext = createContext();

function OrdersContextProvider({ children }) {
	const [ordersState, dispatch] = useReducer(orderReducer, initOrdersState);


	const loadListOrders = async ({ page, size, filter }) => {
		dispatch(ordersAction.setLoading(true));		// ordersState.loading=  true


		try {
			const data = await ordersService.getOrders(page, size);
			const list = {
				data,
				page,
				size,
				filter,
			};
			const statistic = ordersService.statisticStatusOrder(
				data.map((e) => e.statusOrder)
			);
			dispatch(ordersAction.setStatistic(statistic));
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
