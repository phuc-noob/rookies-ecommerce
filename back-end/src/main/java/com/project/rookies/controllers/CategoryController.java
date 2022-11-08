package com.project.rookies.controllers;

import com.project.rookies.dto.request.CategoryDto;
import com.project.rookies.dto.response.CategoryResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.services.inf.ICategoryService;
import com.project.rookies.services.inf.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final ICategoryService categoryService;
    private final IProductService productService;

    @PostMapping
    CategoryResponseDto saveCategory(@Valid @RequestBody CategoryDto categoryDto) {
        return categoryService.saveCategory(categoryDto);
    }

    @PutMapping("/{id}")
    CategoryResponseDto updateCategory(@Valid @RequestBody CategoryDto categoryDto, @PathVariable Long id) {
        return categoryService.updateCategoryById(categoryDto, id);
    }

    @GetMapping
    List<CategoryResponseDto> getListCategory() {
        return categoryService.getALlCategory();
    }

    @GetMapping("/{id}")
    CategoryResponseDto getCategory(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @GetMapping("/{id}/products")
    List<ProductResponseDto> getProductsByCategory(@PathVariable Long id, @RequestParam("page") int page, @RequestParam("size") int size) {
        return productService.getProductsByCategoryBy(id, page, size);
    }

    @DeleteMapping("/{id}")
    DeleteResponseDto deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategoryById(id);
    }

    @PatchMapping("/{cateId}/products/{productId}")
    CategoryResponseDto addProductToCategory(@PathVariable("cateId") Long cateId, @PathVariable("productId") Long productId) {
        return categoryService.addProductToCategory(cateId, productId);
    }
}
