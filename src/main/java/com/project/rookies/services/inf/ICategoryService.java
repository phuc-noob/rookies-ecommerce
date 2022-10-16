package com.project.rookies.services.inf;

import com.project.rookies.dto.request.CategoryDto;
import com.project.rookies.dto.response.CategoryResponseDto;

import java.util.List;

public interface ICategoryService {
    CategoryResponseDto saveCategory(CategoryDto categoryDto);
    boolean isExistCategory(CategoryDto categoryDto);
    CategoryResponseDto updateCategoryById(CategoryDto categoryDto,Long id);
    List<CategoryResponseDto> getALlCategory();
    CategoryResponseDto getCategroybyId(Long id);
}
