import { useState, useEffect, createContext } from "react";
import { ProductService } from "../../helpers/service/productService";
import { CategoryService } from "../service/categoryService";

const ProductContext = createContext();

function ProductProvider({ children }) {
    const [categoryId,setCategoryId] =useState()
    const [productId,setProductId] = useState(0)
    const [ListProduct, setListProduct] = useState([]);
    const [ProductDetail, setProductDetail] = useState({});
    const [selectedFile, setSelectedFile] = useState();
    const [ProductFilter,setProductFilter] = useState({"page":0,"size":8,"category":[]})
    const [ListImages,setListImages] = useState([])

    useEffect(()=>{
        
        console.log(selectedFile)
    },[])

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
        productId,
        ListProduct,
        selectedFile,
        ProductDetail,
        ProductFilter,
        categoryId,
        ListImages,
        setProductId,
        setListImages,
        setCategoryId,
        setSelectedFile,
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