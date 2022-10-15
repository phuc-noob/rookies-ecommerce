package com.project.rookies.controllers;

import com.project.rookies.dto.request.BillOrderDto;
import com.project.rookies.dto.response.BillOrderResponseDto;
import com.project.rookies.services.inf.IBillOrderService;
import com.project.rookies.services.inf.ICustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class BillOrderController {
    private final IBillOrderService billOrderService;
    @PostMapping("/customer/{customerId}/order")
    BillOrderResponseDto saveBillOrder(@RequestBody BillOrderDto billOrderDto, @PathVariable Long customerId)
    {
        return billOrderService.saveBillOrder(billOrderDto,customerId);
    }
}
