package com.project.rookies.dto.response;

import com.project.rookies.entities.Product;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
@Getter@Setter
public class CategoryResponseDto {
    private Long cate_id;
    private String cateName;
    private String discription;
    private String image;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int amount;
    private List<Product> product;
}
