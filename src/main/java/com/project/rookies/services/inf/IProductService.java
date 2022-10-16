package com.project.rookies.services.inf;

import com.project.rookies.dto.request.ProductDto;
import com.project.rookies.dto.response.ProductResponseDto;

import java.util.List;

public interface IProductService {
    ProductResponseDto saveProduct(ProductDto productDto);
    Boolean isExistProduct(ProductDto productDto);
    ProductResponseDto updateProduct(ProductDto productDto, Long id);
    ProductResponseDto getProductById(Long id);
    List<ProductResponseDto> getListProduct(int page,int size);
    List<ProductResponseDto> getListProductBestSeller(int page,int size);
    int updateProductStatus(Boolean status,Long id);
    Boolean checkProductStatus(String productName);
}
