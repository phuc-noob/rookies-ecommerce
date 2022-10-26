package com.project.rookies.controllers;

import com.project.rookies.dto.request.BillOrderDto;
import com.project.rookies.dto.response.BillOrderResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.entities.enums.EOrderStatus;
import com.project.rookies.entities.enums.EProductStatus;
import com.project.rookies.services.inf.IBillOrderService;
import com.project.rookies.services.inf.ICustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class BillOrderController {
    private final IBillOrderService billOrderService;

    @PostMapping
    BillOrderResponseDto saveBillOrder(@Valid @RequestBody BillOrderDto billOrderDto) {
        return billOrderService.saveBillOrder(billOrderDto);
    }

    @GetMapping("/{orderId}")
    BillOrderResponseDto getBillOrder(@PathVariable Long orderId) {
        return billOrderService.getOrderById(orderId);
    }

    @GetMapping
    List<BillOrderResponseDto> getListOrder(@RequestParam(name = "page") int page, @RequestParam(name = "size") int size) {
        return billOrderService.getListOrder(page, size);
    }

    @DeleteMapping("/{orderId}")
    DeleteResponseDto deleteOrderById(@PathVariable(name = "orderId") Long orderId) {
        return billOrderService.deleteOrderById(orderId);
    }

    @PatchMapping("/{orderId}")
    BillOrderResponseDto updateStatusOrder(@RequestBody BillOrderDto billOrderDto, @PathVariable("orderId") Long orderId) {
        return billOrderService.updateOrderStatus(orderId, billOrderDto);
    }
}
