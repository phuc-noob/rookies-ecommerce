package com.project.rookies.controllers;

import com.project.rookies.dto.request.CategoryDto;
import com.project.rookies.dto.response.CategoryResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.services.inf.ICategoryService;
import com.project.rookies.services.inf.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CategoryController {
    private final ICategoryService categoryService;
    private final IProductService productService;

    @PostMapping("/category")
    CategoryResponseDto saveCategory(@RequestBody CategoryDto categoryDto) {
        return categoryService.saveCategory(categoryDto);
    }

    @PutMapping("/category/{id}")
    CategoryResponseDto updateCategory(@RequestBody CategoryDto categoryDto, @PathVariable Long id) {
        return categoryService.updateCategoryById(categoryDto, id);
    }

    @GetMapping("/categories")
    List<CategoryResponseDto> getListCategory() {
        return categoryService.getALlCategory();
    }

    @GetMapping("/category/{id}")
    CategoryResponseDto getCategory(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @GetMapping("/category/{id}/products")
    List<ProductResponseDto> getProductsByCategory(@PathVariable Long id, @RequestParam("page") int page, @RequestParam("size") int size) {
        return productService.getProductsByCategoryBy(id, page, size);
    }

    @DeleteMapping("category/{id}")
    void deleteCategory(@RequestParam(value = "id") Long id, HttpServletResponse response) {
        categoryService.deleteCategoryById(id, response);
    }

    @PatchMapping("/category/{cateId}/product/{productId}")
    CategoryResponseDto addProductToCategory(@PathVariable("cateId") Long cateId, @PathVariable("productId") Long productId) {
        return categoryService.addProductToCategory(cateId, productId);
    }
}
