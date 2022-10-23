package com.project.rookies.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CartDto {
    @NotNull(message = "customerId is require")
    private Long customerId;
    @NotNull(message = "productId is require")
    private Long productId;
    @NotNull(message = "amount is require")
    private int amount;
    private float cartPrice;
}
