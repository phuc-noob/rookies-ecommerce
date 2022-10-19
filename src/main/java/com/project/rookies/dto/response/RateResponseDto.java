package com.project.rookies.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RateResponseDto {
    private Long rateId;
    private String content;
    private LocalDateTime createdAt;
    private float point;
    private boolean status;
    private CustomerResponseDto customer;
    private ProductResponseDto product;
}
