

import axios from "axios";
import Cookies from 'universal-cookie';
import { axiosPrivate } from "../config/axiosConnect";
import { ResponseError } from "../util/ResponseError";
const API_ORDERS = process.env.REACT_APP_API_HOST + "/orders";


const API_PRODUCT = "http://localhost:8080/api/products";
const LOCAL_STORAGE_TOKEN_NAME = process.env.REACT_APP_LOCAL_STORAGE_TOKEN_NAME;

const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};

function formatOrderDetail(detail) {
	const {
		id,
		product: { productId, productName },
		unitPrice,
		amount,
		orderItemPrice,
	} = detail;
	return {
		id,
		productName,
		productId,
		amount,
		price: unitPrice,
		totalPrice: orderItemPrice,
	};
}
function formatCustomer(customer) {
	const { id, firstName, lastName, phone, email, address } = customer;
	return {
		id,
		fullname: `${lastName} ${firstName}`,
		phone,
		email,
		address,
	};
}

function formatResponse(response) {
	let { id, status, totalPrice, updatedAt, customer, oderDetails } = response;
	return {
		id,
		statusOrder: status,
		totalPrice: totalPrice,
		createAt: updatedAt,
		customer: formatCustomer(customer),
		orderDetails: oderDetails.map(formatOrderDetail),
	};
}

const getOrders = async (page, size) => {
	const cookies = new Cookies();
    if (cookies.get(LOCAL_STORAGE_TOKEN_NAME)) {
		setAuthToken(cookies.get(LOCAL_STORAGE_TOKEN_NAME));
		console.log(cookies.get(LOCAL_STORAGE_TOKEN_NAME))
	} else {
		throw Error("Dont have token");
	}
	const params = { page, size };
	const query = "?" + new URLSearchParams(params).toString();
	try {
		const res = await axiosPrivate.get(`${API_ORDERS}${query}`);
		return res.data.map(formatResponse);
	} catch (err) {
		throw ResponseError(err);
	}
};

const setRejectOrder = async (id) => {
	const body = {
		orderStatus: "REJECTED",
	};
	try {
		await axiosPrivate.patch(`${API_ORDERS}/${id}`, body);
	} catch (err) {
		throw ResponseError(err);
	}
};

const setAcceptOrder = async (id) => {
	const body = {
		orderStatus: "ACCEPTED",
	};
	try {
		await axiosPrivate.patch(`${API_ORDERS}/${id}`, body);
	} catch (err) {
		throw ResponseError(err);
	}
};
export const ordersService = {
	getOrders,
	setRejectOrder,
	setAcceptOrder,
};
