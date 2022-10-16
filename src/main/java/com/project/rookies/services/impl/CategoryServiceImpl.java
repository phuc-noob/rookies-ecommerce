package com.project.rookies.services.impl;

import com.project.rookies.dto.request.CategoryDto;
import com.project.rookies.dto.response.CategoryResponseDto;
import com.project.rookies.entities.Category;
import com.project.rookies.exceptions.ApiRequestException;
import com.project.rookies.repositories.CategoryRepo;
import com.project.rookies.services.inf.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements ICategoryService {
    private final CategoryRepo categoryRepo;
    private final ModelMapper modelMapper;
    @Override
    public CategoryResponseDto saveCategory(CategoryDto categoryDto) {
        if(isExistCategory(categoryDto)) throw new ApiRequestException("category was existed", HttpStatus.BAD_REQUEST);
        Category category = modelMapper.map(categoryDto, Category.class);
        category.setCreatedAt(LocalDateTime.now());
        return modelMapper.map(categoryRepo.save(category),CategoryResponseDto.class) ;
    }
    @Override
    public boolean isExistCategory(CategoryDto categoryDto) {
        String cateName = categoryDto.getCateName();
        if(categoryRepo.findByCateName(cateName)!=null) return true;
        else return false;
    }

    @Override
    public CategoryResponseDto updateCategoryById(CategoryDto categoryDto,Long id) {
        if(!categoryRepo.existsById(id)) throw new ApiRequestException("category not exist",HttpStatus.NOT_FOUND);
        try {
            CategoryResponseDto categoryResponseDto = new CategoryResponseDto();
            categoryRepo.findById(id).ifPresent(category -> {
                modelMapper.map(categoryDto,category);
                category.setUpdatedAt(LocalDateTime.now());
                modelMapper.map(category,categoryResponseDto);
                categoryRepo.save(category);
            });

            return categoryResponseDto;
        }catch (Exception exception){
            throw new ApiRequestException(exception.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @Override
    public List<CategoryResponseDto> getALlCategory() {
        return categoryRepo.findAll()
                .stream()
                .map(category -> modelMapper.map(category,CategoryResponseDto.class))
                .collect(Collectors.toList());
    }
    @Override
    public CategoryResponseDto getCategroybyId(Long id) {
        if(!categoryRepo.existsById(id)) throw new ApiRequestException("category not exist",HttpStatus.NOT_FOUND);
        return modelMapper.map(categoryRepo.getById(id),CategoryResponseDto.class) ;
    }
}
