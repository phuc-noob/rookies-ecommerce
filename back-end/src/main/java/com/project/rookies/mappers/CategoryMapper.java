package com.project.rookies.mappers;

import com.project.rookies.dto.response.CategoryResponseDto;
import com.project.rookies.entities.Category;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CategoryMapper {
    private final ModelMapper modelMapper;
    private final ProductMapper productMapper;

    public CategoryResponseDto mapEntityToDto(Category category) {
        return CategoryResponseDto.builder()
                .cateId(category.getCateId())
                .image(category.getImage())
                .amount(category.getAmount())
                .cateName(category.getCateName())
                .description(category.getDescription())
                .product(category.getProduct().stream().map(product ->
                                productMapper.mapEntityToDto(product))
                        .collect(Collectors.toList()))
                .build();
    }
}
