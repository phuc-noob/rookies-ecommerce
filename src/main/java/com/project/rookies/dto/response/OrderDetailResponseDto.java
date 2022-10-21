package com.project.rookies.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
@JsonSerialize
@Getter
@Setter
public class OrderDetailResponseDto {
    private Long id;
    private ProductResponseDto product;
    private float unitPrice;
    private int amount;
    private float orderItemPrice;
}
