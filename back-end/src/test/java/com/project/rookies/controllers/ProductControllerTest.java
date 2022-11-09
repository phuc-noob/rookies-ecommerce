package com.project.rookies.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.rookies.dto.request.ProductDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.entities.enums.EProductStatus;
import com.project.rookies.services.impl.ProductServiceImpl;
import com.project.rookies.services.inf.IProductService;
import com.project.rookies.services.inf.IRateService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ProductControllerTest {
    ProductResponseDto expectProduct;
    IProductService productService;
    ProductDto productDto;
    ProductController productController;
    IRateService rateService;
    ProductResponseDto productResponseDto;
    @Autowired
    private MockMvc mvc;
    @BeforeEach()
    void beforeEach() {
        productService = mock(ProductServiceImpl.class);
        productController = new ProductController(rateService,productService);
        productDto = new ProductDto();
        expectProduct = new ProductResponseDto();
        productResponseDto = mock(ProductResponseDto.class);
    }

    @Test()
    void saveProduct_ShouldReturnProductResponseDto_WhenValid() {
        when(productService.saveProduct(productDto)).thenReturn(expectProduct);
        ProductResponseDto result = productController.saveProduct(productDto);
        assertEquals(expectProduct, result);
    }

    @Test()
    void updateProduct_ShouldReturnProductResponseDto_WhenValid() {
        Long productId = 1L;
        when(productService.updateProduct(productDto, productId)).thenReturn(expectProduct);
        ProductResponseDto result = productController.updateProduct(productDto, productId);
        assertEquals(expectProduct, result);
    }

    @Test()
    void getProduct_ShouldReturnProductResponseDto_WhenValid() {
        Long productId = 1L;
        when(productService.getProductById(productId)).thenReturn(expectProduct);
        ProductResponseDto result = productController.getProduct(productId);
        assertEquals(expectProduct, result);
    }

    @Test()
    void getListProductByTag_ShouldReturnListProductResponseDto_WhenValid() {
        List<ProductResponseDto> expectResult = new ArrayList<>();
        expectResult.add(expectProduct);
        int page =1,size =1;
        String tag ="best-seller";
        when(productService.getListProductByTag(page,size,tag)).thenReturn(expectResult);
//        List<ProductResponseDto> result = productController.getListProductByTag(tag,page,size);
//        assertEquals(expectResult, result);
    }
    @Test()
    void deleteProduct_ShouldReturnDeleteResponseDto_WhenValid() {
        Long id =1L;
        DeleteResponseDto deleteResponseDto = mock(DeleteResponseDto.class);
        when(productService.updateProductStatus(EProductStatus.DELETED,id)).thenReturn(deleteResponseDto);
        DeleteResponseDto result = productController.deleteProduct(id);
        assertEquals(deleteResponseDto, result);
    }

    @Test()
    void getListProduct_ShouldReturnListProduct_WhenDataValid(){
        List<Long> categories =new ArrayList<>();
        int page =0;
        float price=10;
        float rate=3;
        float priceON =50000;
        int size=8;
        List<ProductResponseDto> listProduct = new ArrayList<>();
        when(productService.getListProduct(categories,rate,price,priceON,page,size)).thenReturn(listProduct);
        List<ProductResponseDto> result = productController.getListProduct(categories,price,page,rate,priceON,size);
        assertEquals(listProduct,result);
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
