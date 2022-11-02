import { useState, useEffect, createContext } from "react";
import { ProductService } from "../../helpers/service/productService";
import { CategoryService } from "../service/categoryService";

const ProductContext = createContext();

function ProductProvider({ children }) {
    const [ListProduct, setListProduct] = useState([]);
    const [ProductDetail, setProductDetail] = useState({});
    const [ProductFilter,setProductFilter] = useState({"page":0,"size":8,"category":[]})
    useEffect(()=>{
        ProductService.getProduct().then(result=>{
            setListProduct(result);
        },)
    },[])
    useEffect(()=>{
        ProductService.getProductById(localStorage.getItem("productId")).then(res =>{
            setProductDetail(res)
        })
    },[])

    
    const loadProductFilter = async(filter)=>{
        setProductFilter(filter)
        ProductService.filterProduct(filter).then(res => {
            setListProduct(res)
        })
    }
    

    const loadProductDetail = async (id) => {
        ProductService.getProductById(id).then(result => {
            setProductDetail(result)
        })
    }

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
        ProductDetail,
        ProductFilter,
        loadProductFilter,
        loadProducts,
        loadListProductByCate,
        loadProductDetail
    }
    return (
        <ProductContext.Provider value={products}>
            {children}
        </ProductContext.Provider>
    )

}

export { ProductContext, ProductProvider }