package com.project.rookies.services.inf;

import com.project.rookies.dto.request.CategoryDto;
import com.project.rookies.dto.response.CategoryResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface ICategoryService {
    CategoryResponseDto saveCategory(CategoryDto categoryDto);

    boolean isExistCategory(CategoryDto categoryDto);

    CategoryResponseDto updateCategoryById(CategoryDto categoryDto, Long id);

    List<CategoryResponseDto> getALlCategory();

    CategoryResponseDto getCategoryById(Long id);

    CategoryResponseDto addProductToCategory(Long cateId, Long productId);

    DeleteResponseDto deleteCategoryById(Long id, HttpServletResponse response);
}
