package com.project.rookies.services.inf;

import com.project.rookies.dto.request.BillOrderDto;
import com.project.rookies.dto.response.BillOrderResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.entities.BillOrder;
import com.project.rookies.entities.Customer;

import java.util.List;

public interface IBillOrderService {
    BillOrderResponseDto saveBillOrder(BillOrderDto billOrder);
    Boolean isValidCustomerForOrder(Customer customer);
    String isValidQuantityProductInOrder(BillOrderDto billOrderDto);
    BillOrderResponseDto getOrderById(Long orderId);
    List<BillOrderResponseDto> getListOrder(int page, int size);
    DeleteResponseDto deleteOrderById(Long orderId);
    BillOrderResponseDto updateOrderStatus(Long orderId,BillOrderDto billOrderDto);
}
