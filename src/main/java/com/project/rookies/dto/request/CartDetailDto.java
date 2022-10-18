package com.project.rookies.dto.request;

import com.project.rookies.entities.Cart;
import com.project.rookies.entities.Product;
import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class CartDetailDto {
    private Cart cart;
    private Product product;
    private int mount;
    private float cartProductPrice;
}
