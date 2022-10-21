package com.project.rookies.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDetailDto {
    private Long productId;
    private float unitPrice;
    private int amount;
    private float orderItemPrice;
}
