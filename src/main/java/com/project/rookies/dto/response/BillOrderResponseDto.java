package com.project.rookies.dto.response;

import com.project.rookies.entities.enums.EOrderStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
public class BillOrderResponseDto {
    private Long id;
    private EOrderStatus status;
    private float totalPrice;
    private LocalDateTime updatedAt;
    private LocalDateTime paymentDay;
    private CustomerResponseDto customer;
    private List<OrderDetailResponseDto> oderDetails = new ArrayList<>();
}
