package com.project.rookies.dto.request;

import com.project.rookies.entities.Customer;
import com.project.rookies.entities.OrderDetail;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BillOrderDto {
    private float totalPrice;
    private LocalDateTime paymentDay;
    private Customer customer;
    private List<OrderDetail> oderDetails;
}
