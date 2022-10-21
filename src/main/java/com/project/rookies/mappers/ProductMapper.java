package com.project.rookies.mappers;



import com.project.rookies.dto.request.ImageDto;
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
    public ProductResponseDto mapEntityToDto(Product product)
    {
        return ProductResponseDto.builder()
                .productId(product.getProductId())
                .price(product.getPrice())
                .productName(product.getProductName())
                .description(product.getDescription())
                .amount(product.getAmount())
                .totalSold(product.getTotalSold())
                .status(product.getStatus())
                .images(product.getImages().stream().map(image -> modelMapper.map(image, ImageDto.class)).collect(Collectors.toList()))
                .build();
    }
}
