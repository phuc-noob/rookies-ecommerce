package com.project.rookies.dto.response;

import com.project.rookies.entities.Customer;
import com.project.rookies.entities.OrderDetail;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BillOrderResponseDto {
    private Long id;
    private boolean status;
    private float totalPrice;
    private LocalDateTime updatedAt;
    private LocalDateTime paymentDay;
    private CustomerResponseDto customer;
    private List<OrderDetail> oderDetails;
}
