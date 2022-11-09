package com.project.rookies.controllers;

import com.project.rookies.dto.request.CustomerDto;
import com.project.rookies.dto.response.BillOrderResponseDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.entities.enums.ECustomerStatus;
import com.project.rookies.services.inf.IBillOrderService;
import com.project.rookies.services.inf.ICartService;
import com.project.rookies.services.inf.ICustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@Slf4j
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final ICustomerService customerService;
    private final ICartService cartService;
    private final IBillOrderService billOrderService;

    @GetMapping("/{id}")
    CustomerResponseDto getCustomer(@PathVariable Long id) {
        return customerService.findCustomerById(id).get(0);
    }

    @GetMapping
    List<CustomerResponseDto> getListCustomer(@RequestParam(name = "page") int page, @RequestParam(name = "size") int size) {
        return customerService.findListCustomer(page, size);
    }
    @GetMapping("/{id}/orders")
    List<BillOrderResponseDto> getListOrderByCustomer(@PathVariable Long id,@RequestParam("page") int page,@RequestParam("size") int size)
    {
        return billOrderService.getListOrderByCustomer(id,page,size);
    }

    @GetMapping("/{id}/carts/quantity")
    Object getQuantityCart(@PathVariable Long id) {
        return Map.of("quantity", cartService.getCartQuantity(id));
    }

    @PostMapping
    CustomerResponseDto saveCustomer(@Valid @RequestBody CustomerDto customerDto) {
        return customerService.saveCustomer(customerDto);
    }

    @PutMapping("/{id}")
    CustomerResponseDto updateCustomer(@Valid @RequestBody CustomerDto customerDto, @PathVariable Long id) {
        return customerService.updateCustomerById(customerDto, id);
    }

    @DeleteMapping("/{id}")
    DeleteResponseDto deleteCustomer(@PathVariable Long id) {
        return customerService.updateStatusCustomer(id, ECustomerStatus.DELETED);
    }
}
