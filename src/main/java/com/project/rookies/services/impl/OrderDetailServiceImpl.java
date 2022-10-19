package com.project.rookies.services.impl;

import com.project.rookies.entities.OrderDetail;
import com.project.rookies.repositories.OrderDetailRepo;
import com.project.rookies.services.inf.IOrderDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OrderDetailServiceImpl implements IOrderDetailService {
    private final OrderDetailRepo orderDetailRepo;

    @Override
    public OrderDetail saveOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepo.save(orderDetail);
    }
}
