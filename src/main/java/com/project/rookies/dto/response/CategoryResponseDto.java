package com.project.rookies.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.rookies.entities.Product;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponseDto {
    private Long cateId;
    private String cateName;
    private String description;
    private String image;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int amount;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<ProductResponseDto> product = new ArrayList<>();
}
