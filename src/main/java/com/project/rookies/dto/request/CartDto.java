package com.project.rookies.dto.request;

import com.project.rookies.entities.CartDetail;
import com.project.rookies.entities.Customer;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter@Setter
public class CartDto {
    private Long Id;
    private Customer customer;
    private List<CartDetail> productList;
}
