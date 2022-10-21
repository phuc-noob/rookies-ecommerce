package com.project.rookies.dto.request;

import com.project.rookies.entities.enums.EOrderStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.List;

@Getter
@Setter
public class BillOrderDto {
    private Long customerId;
    private List<OrderDetailDto> orderDetails;
    @Enumerated(EnumType.STRING)
    private EOrderStatus orderStatus;
}
