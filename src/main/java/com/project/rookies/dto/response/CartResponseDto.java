package com.project.rookies.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.rookies.entities.Customer;
import com.project.rookies.entities.Product;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CartResponseDto {
    private Long Id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private ProductResponseDto product;
    private int amount;
    private float cartPrice;
    private CustomerResponseDto customer;
}
