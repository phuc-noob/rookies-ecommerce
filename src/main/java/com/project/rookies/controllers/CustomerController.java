package com.project.rookies.controllers;

import com.project.rookies.dto.request.CustomerDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.entities.enums.ECustomerStatus;
import com.project.rookies.services.inf.ICustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api")
@RequiredArgsConstructor
public class CustomerController {
    private final ICustomerService customerService;

    @GetMapping("/customer/{id}")
    CustomerResponseDto getCustomer(@PathVariable Long id) {
        return customerService.findCustomerById(id).get(0);
    }

    @GetMapping("/customers")
    List<CustomerResponseDto> getListCustomer(@RequestParam(name = "page") int page, @RequestParam(name = "size") int size) {
        return customerService.findListCustomer(page, size);
    }

    @PostMapping("/customer")
    CustomerResponseDto saveCustomer(@RequestBody CustomerDto customerDto) {
        return customerService.saveCustomer(customerDto);
    }

    @PutMapping("/customer/{id}")
    CustomerResponseDto updateCustomer(@RequestBody CustomerDto customerDto, @PathVariable Long id) {
        return customerService.updateCustomerById(customerDto, id);
    }

    @DeleteMapping("/customer/{id}")
    DeleteResponseDto deleteCustomer(@PathVariable Long id) {
        return customerService.updateStatusCustomer(id, ECustomerStatus.DELETED);
    }
}
