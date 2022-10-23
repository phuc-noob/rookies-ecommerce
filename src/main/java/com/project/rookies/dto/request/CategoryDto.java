package com.project.rookies.dto.request;

import com.project.rookies.entities.Product;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
public class CategoryDto {
    @NotBlank(message = "category name is require")
    private String cateName;
    private String description;
    @NotBlank(message = "image is require")
    private String image;
    private int amount;
    private List<ProductDto> product;
}
