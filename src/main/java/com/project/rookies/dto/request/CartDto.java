package com.project.rookies.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartDto {
    private Long customerId;
    private Long productId;
    private int amount;
    private float cartPrice;
}
