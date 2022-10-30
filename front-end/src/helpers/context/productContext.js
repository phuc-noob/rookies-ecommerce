import { useState, useEffect, createContext } from "react";
import { ProductService } from "../../helpers/service/productService";
import { CategoryService } from "../service/categoryService";

const ProductContext = createContext();

function ProductProvider({ children }) {
    const [ListProduct, setListProduct] = useState([]);

    useEffect(()=>{
        ProductService.getProduct().then(result=>{
            setListProduct(result);
        },)
    },[])

    const loadListProductByCate = async (id) => {
        CategoryService.getListProductByCategory(id).then(result=>{
            setListProduct(result)
        })
    }

    const loadProducts = async () => {
        ProductService.getProduct().then(result=>{
            setListProduct(result);
        })
    }

    const products = {
        ListProduct,
        loadProducts,
        loadListProductByCate
    }
    return (
        <ProductContext.Provider value={products}>
            {children}
        </ProductContext.Provider>
    )

}

export { ProductContext, ProductProvider }