package com.project.rookies.dto.request;

import com.project.rookies.entities.enums.EOrderStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class BillOrderDto {
    @NotNull(message = "customer is require")
    private Long customerId;
    @NotEmpty(message = "order item is require")
    private List<OrderDetailDto> orderDetails;
    @Enumerated(EnumType.STRING)
    private EOrderStatus orderStatus;
}
