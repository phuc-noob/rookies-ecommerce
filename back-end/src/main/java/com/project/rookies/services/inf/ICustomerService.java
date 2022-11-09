package com.project.rookies.services.inf;

import com.project.rookies.dto.request.CustomerDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.entities.Customer;
import com.project.rookies.entities.enums.ECustomerStatus;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface ICustomerService {

    CustomerResponseDto saveCustomer(CustomerDto customer);

    CustomerResponseDto updateCustomerById(CustomerDto customerDto, Long id);

    List<CustomerResponseDto> findCustomerById(Long id);

    List<CustomerResponseDto> findListCustomer(int page, int size);

    boolean isExistCustomer(CustomerDto customerDto);

    DeleteResponseDto deleteCustomer(Long id);

    DeleteResponseDto updateStatusCustomer(Long id, ECustomerStatus customerStatus);
    boolean resetPassword(String email);
}
