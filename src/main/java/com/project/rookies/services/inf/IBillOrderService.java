package com.project.rookies.services.inf;

import com.project.rookies.dto.request.BillOrderDto;
import com.project.rookies.dto.response.BillOrderResponseDto;
import com.project.rookies.entities.BillOrder;

public interface IBillOrderService {
    BillOrderResponseDto saveBillOrder(BillOrderDto billOrder, Long customerId);
    Boolean isExistBillOrder(Long customerId);
}
