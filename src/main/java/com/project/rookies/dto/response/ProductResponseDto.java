package com.project.rookies.dto.response;


import com.project.rookies.entities.Rate;
import com.project.rookies.entities.enums.EProductStatus;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProductResponseDto {
    private Long productId;
    private String productName;
    private String description;
    private float price;
    private int amount;
    private int totalSold;
    private EProductStatus status;
}
