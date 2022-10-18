package com.project.rookies.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.rookies.entities.Cart;
import lombok.Getter;
import lombok.Setter;
@Getter@Setter
public class CartDetailResponseDto {
    private Long id;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Cart cart;
    @JsonIgnore
    private ProductResponseDto product;
    private int mount;
    private float cartProductPrice;
}
