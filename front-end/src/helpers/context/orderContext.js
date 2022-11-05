import { createContext, useContext, useEffect, useState } from "react";
import { CartService } from "../service/cartService";
import { OrderService } from "../service/orderService";
import { AuthContext } from "./authContext";
const OrderContext = createContext()

function OrderProvider({ children }) {
    const [CartQuantity, setCartQuantity] = useState(0)
    const [ListCart, setListCart] = useState([])
    const [TotalBill,setTotalBill] = useState(0)
    const [ListCartOrderPending,setCartOrderPending] = useState([])
    const [Order,setOrder] = useState()

    const {
        authState: { isAuthenticated, user, authorization },
        logout,
    } = useContext(AuthContext);

    useEffect(() => {
        isAuthenticated ? CartService.getCartQuantity(user.customerId).then(res => {
            setCartQuantity(res.quantity)
        }) : setCartQuantity(0)

        isAuthenticated ? CartService.getListCart(user.customerId).then(res => {
            setListCart(res)
        }) : console.log("ok")
        loadQuantity()
    }, [isAuthenticated])

    const orderProduct = async () => {
        const order ={customerId:user.customerId,orderDetails:[]}
        ListCartOrderPending.map(e => {
            CartService.deleteCartById(e.id).then(()=>{loadQuantity()})
            const orderItem ={productId:e.productId,amount:e.amount}
            order.orderDetails.push(orderItem)
        })
        CartService.getListCart(user.customerId).then(res => {
            setListCart(res)
        })
        setCartOrderPending([])
        OrderService.saveOrder(order)
        loadQuantity()

    }

    const loadQuantity = async (customerId) => {
        isAuthenticated ? CartService.getCartQuantity(user.customerId).then(res => {
            setCartQuantity(res.quantity)
        }) : setCartQuantity(0)
    }

    const loadListCart = async (cart) => {
        CartService.saveCard(cart).then(res => {
            CartService.getCartQuantity(user.customerId).then(res => {
                setCartQuantity(res.quantity)
            })
        })

    }
    const order = {
        CartQuantity,
        ListCartOrderPending,
        setCartOrderPending,
        ListCart,
        orderProduct,
        TotalBill,
        setTotalBill,
        loadQuantity,
        setCartQuantity,
        setListCart,
        loadListCart
    }

    return (
        <OrderContext.Provider value={order}>
            {children}
        </OrderContext.Provider>
    )

}

export { OrderContext, OrderProvider }