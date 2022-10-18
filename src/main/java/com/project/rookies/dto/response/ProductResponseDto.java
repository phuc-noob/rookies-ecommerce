package com.project.rookies.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.rookies.entities.CartDetail;
import com.project.rookies.entities.Rate;
import com.project.rookies.entities.enums.EProductStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    private EProductStatus status;
    List<Rate> rates;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<CartDetail> cartProducts = new ArrayList<>();
}
