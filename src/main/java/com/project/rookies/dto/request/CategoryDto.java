package com.project.rookies.dto.request;

import com.project.rookies.entities.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter@Setter
public class CategoryDto {
    private String cateName;
    private String description;
    private String image;
    private int amount;
    private List<Product> product;
}
