package com.project.rookies.mappers;


import com.project.rookies.dto.request.ImageDto;
import com.project.rookies.dto.response.CategoryProductResponseDto;
import com.project.rookies.dto.response.CategoryResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.entities.Product;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class ProductMapper {
    private final ModelMapper modelMapper;

    public ProductResponseDto mapEntityToDto(Product product) {
        return ProductResponseDto.builder()
                .categories(product.getCategories().stream().map(category
                        -> modelMapper.map(category, CategoryProductResponseDto.class)).collect(Collectors.toList()))
                .productId(product.getProductId())
                .price(product.getPrice())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .rating(product.getRatePoint())
                .productName(product.getProductName())
                .description(product.getDescription())
                .amount(product.getAmount())
                .totalSold(product.getTotalSold())
                .status(product.getStatus())
                .images(product.getImages().stream().map(image -> modelMapper.map(image, ImageDto.class)).collect(Collectors.toList()))
                .build();
    }
}
