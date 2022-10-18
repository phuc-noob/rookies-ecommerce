package com.project.rookies.dto.request;

import com.project.rookies.entities.Customer;
import com.project.rookies.entities.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter@Setter
public class CartDto {
    private int amount;
    private float cartPrice;
}
