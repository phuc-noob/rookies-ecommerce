package com.project.rookies.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.project.rookies.entities.CartDetail;
import com.project.rookies.entities.Customer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter@Setter
public class CartResponseDto {
    private Long Id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private CustomerResponseDto customer;
    private List<CartDetail> productList;
}
