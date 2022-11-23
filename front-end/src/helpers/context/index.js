import AuthContextProvider from "./authContext";
import { OrderProvider } from "./orderContext";
import OrdersContextProvider from "./OrdersContext";
import { ProductProvider } from "./productContext";

function ContextProvider({ children }) {
	return (
		<AuthContextProvider>
			<OrdersContextProvider>
				<OrderProvider>
					<ProductProvider>{children}</ProductProvider>
				</OrderProvider>
			</OrdersContextProvider>
		</AuthContextProvider>
	);
}

export default ContextProvider;
