package com.project.rookies.dto.response;

import com.project.rookies.entities.CartDetail;
import com.project.rookies.entities.Rate;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
@Getter@Setter
public class ProductResponseDto {
    private Long productId;
    private String productName;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private float price;
    private int amount;
    private int totalSold;
    private boolean status;
    List<Rate> rates;
    private List<CartDetail> cartProducts;
}
