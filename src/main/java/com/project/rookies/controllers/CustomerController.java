package com.project.rookies.controllers;

import com.project.rookies.dto.request.CustomerDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.exceptions.ApiRequestException;
import com.project.rookies.services.inf.ICustomerService;
import com.project.rookies.utils.EmailUtils;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api")
@RequiredArgsConstructor
public class CustomerController {
    private final ICustomerService customerService;

    @PostMapping("/customer")
    public CustomerResponseDto saveCustomer(@RequestBody CustomerDto customerDto)
    {
        return customerService.saveCustomer(customerDto);
    }
    @PutMapping("/customer/{id}")
    public CustomerResponseDto updateCustomer(@RequestBody CustomerDto customerDto,@PathVariable Long id)
    {
        return customerService.updateCustomerById(customerDto,id);
    }
    @GetMapping("customer/{id}")
    public List<CustomerResponseDto> getCustomer(@PathVariable Long id)
    {
        return customerService.findCustomerById(id);
    }
}
