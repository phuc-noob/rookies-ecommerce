package com.project.rookies.services.impl;

import com.project.rookies.entities.Customer;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.services.inf.ICustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomerServiceImpl implements ICustomerService {
    private final CustomerRepo customerRepo;
    @Override
    public Customer saveCustomer(Customer customer) {
        return customerRepo.save(customer);
    }
}
