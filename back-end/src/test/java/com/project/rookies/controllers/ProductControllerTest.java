package com.project.rookies.controllers;

import com.project.rookies.dto.request.ProductDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.entities.enums.EProductStatus;
import com.project.rookies.services.impl.ProductServiceImpl;
import com.project.rookies.services.inf.IProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ProductControllerTest {
    ProductResponseDto expectProduct;
    IProductService productService;
    ProductDto productDto;
    ProductController productController;

    @BeforeEach()
    void beforeEach() {
        productService = mock(ProductServiceImpl.class);
        productController = new ProductController(productService);
        productDto = new ProductDto();
        expectProduct = new ProductResponseDto();
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
        List<ProductResponseDto> result = productController.getListProductByTag(tag,page,size);
        assertEquals(expectResult, result);
    }
    @Test()
    void deleteProduct_ShouldReturnDeleteResponseDto_WhenValid() {
        Long id =1L;
        DeleteResponseDto deleteResponseDto = mock(DeleteResponseDto.class);
        when(productService.updateProductStatus(EProductStatus.DELETED,id)).thenReturn(deleteResponseDto);
        DeleteResponseDto result = productController.deleteProduct(id);
        assertEquals(deleteResponseDto, result);
    }
}
