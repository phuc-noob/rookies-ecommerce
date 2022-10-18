package com.project.rookies.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.rookies.entities.Product;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Getter@Setter
public class CategoryResponseDto {
    private Long cateId;
    private String cateName;
    private String description;
    private String image;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int amount;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Product> product = new ArrayList<>();
}
