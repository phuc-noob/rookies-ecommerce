import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./helpers/context";
import { ProductProvider } from "./helpers/context/productContext"
import { OrderProvider } from "./helpers/context/orderContext";
import OrdersContextProvider from "../src/helpers/context/OrdersContext"

console.log(process.env);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ContextProvider>
				<ProductProvider>
					<OrdersContextProvider>
						<OrderProvider>
							<App />
						</OrderProvider>
					</OrdersContextProvider>
				</ProductProvider>
			</ContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
