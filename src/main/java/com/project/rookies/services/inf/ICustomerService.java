package com.project.rookies.services.inf;

import com.project.rookies.dto.request.CustomerDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.entities.Customer;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface ICustomerService {
    CustomerResponseDto saveCustomer(CustomerDto customer);
    CustomerResponseDto updateCustomerById(CustomerDto customerDto,Long id);
    List<CustomerResponseDto> findCustomerById(Long id);
    boolean isExistCustomer(CustomerDto customerDto);
    void deleteCustomer(Long id, HttpServletResponse response);

}
