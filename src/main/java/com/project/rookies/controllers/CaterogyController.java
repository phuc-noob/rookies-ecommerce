package com.project.rookies.controllers;

import com.project.rookies.dto.request.CategoryDto;
import com.project.rookies.dto.response.CategoryResponseDto;
import com.project.rookies.services.inf.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CaterogyController {
    private final ICategoryService categoryService;
    @PostMapping("/category")
    CategoryResponseDto saveCategory(@RequestBody CategoryDto categoryDto)
    {
        return categoryService.saveCategory(categoryDto);
    }
    @PutMapping("/category/{id}")
    CategoryResponseDto updateCategory(@RequestBody CategoryDto categoryDto,@PathVariable Long id)
    {
        return categoryService.updateCategoryById(categoryDto,id);
    }
    @GetMapping("/categories")
    List<CategoryResponseDto> getListCategory()
    {
        return categoryService.getALlCategory();
    }
    @GetMapping("/category/{id}")
    CategoryResponseDto getCategory(@PathVariable Long id)
    {
        return categoryService.getCategroybyId(id);
    }
    @DeleteMapping("category/{id}")
    void deleteCategory(@RequestParam(value = "id") Long id)
    {
        // wait for product controller
    }
}
