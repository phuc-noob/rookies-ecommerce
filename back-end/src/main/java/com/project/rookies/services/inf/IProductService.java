package com.project.rookies.services.inf;

import com.project.rookies.dto.request.ProductDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.entities.enums.EProductStatus;

import java.util.List;

public interface IProductService {
    ProductResponseDto saveProduct(ProductDto productDto);

    Boolean isExistProduct(ProductDto productDto);

    ProductResponseDto updateProduct(ProductDto productDto, Long id);

    ProductResponseDto getProductById(Long id);

    List<ProductResponseDto> getListProduct(int page, int size);

    List<ProductResponseDto> getListProductByTag(int page, int size,String tag);

    DeleteResponseDto updateProductStatus(EProductStatus status, Long id);

    Boolean checkProductStatus(String productName);

    List<ProductResponseDto> getProductsByCategoryBy(Long id, int page, int size);
}
