package com.project.rookies.dto.response;


import com.project.rookies.dto.request.ImageDto;
import com.project.rookies.entities.enums.EProductStatus;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDto {
    private Long productId;
    private String productName;
    private String description;
    private float price;
    private int amount;
    private float rating;
    private int totalSold;
    private EProductStatus status;
    private List<CategoryProductResponseDto> categories ;
    private List<ImageDto> images = new ArrayList<>();
}
