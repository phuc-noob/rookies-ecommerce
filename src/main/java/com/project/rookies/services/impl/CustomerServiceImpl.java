package com.project.rookies.services.impl;

import com.project.rookies.dto.request.CustomerDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.entities.Customer;
import com.project.rookies.entities.Role;
import com.project.rookies.entities.enums.ECustomerStatus;
import com.project.rookies.entities.enums.ERoleType;
import com.project.rookies.exceptions.ApiRequestException;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.repositories.RoleRepo;
import com.project.rookies.services.inf.ICustomerService;
import com.project.rookies.utils.EmailUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CustomerServiceImpl implements ICustomerService {
    private final CustomerRepo customerRepo;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final RoleRepo roleRepo;
    @Override
    public CustomerResponseDto saveCustomer(CustomerDto customerDto) {
        String email = customerDto.getEmail();
        if(EmailUtils.isValidEmail(email))
        {
            if(isExistCustomer(customerDto)){
                throw new ApiRequestException("email was existed ",HttpStatus.BAD_REQUEST);
            }else{
                Customer customer = modelMapper.map(customerDto, Customer.class);
                customer.setPassword(passwordEncoder.encode(customerDto.getPassword()));
                Role role = roleRepo.findByRoleName(ERoleType.ROLE_USER);
                customer.setRole(role);
                customer.setStatus(ECustomerStatus.ACTIVE);
                customer.setCreatedAt(LocalDateTime.now());
                return modelMapper.map(customerRepo.save(customer),CustomerResponseDto.class);
            }
        }else{
            throw new ApiRequestException("email not valid", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public boolean isExistCustomer(CustomerDto customerDto) {
        //String email = customerDto.getEmail();
        if (customerRepo.findByEmail(customerDto.getEmail()) != null) {
            return true;
        }else{
            return false;
        }
    }

    @Override
    public DeleteResponseDto deleteCustomer(Long id) {
        try {
            customerRepo.deleteById(id);
            return new DeleteResponseDto("delete success",HttpStatus.OK.value(),HttpStatus.OK);
        }catch (Exception exception)
        {
            return new DeleteResponseDto("delete fail",HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public DeleteResponseDto updateStatusCustomer(Long id, ECustomerStatus customerStatus) {
        if(customerRepo.existsById(id)){
            Customer customer = customerRepo.getById(id);
            customer.setStatus(customerStatus);
            customerRepo.save(customer);
            return new DeleteResponseDto("delete success",HttpStatus.OK.value(), HttpStatus.OK);
        }else {
            return new DeleteResponseDto("delete fail",HttpStatus.NOT_FOUND.value(),HttpStatus.NOT_FOUND);
        }
    }


    @Override
    public CustomerResponseDto updateCustomerById(CustomerDto customerDto, Long id) {
        try{
            customerRepo.findById(id).ifPresent(customer ->{
                customer.setAddress(customerDto.getAddress());
                customer.setFirstName(customerDto.getFirstName());
                customer.setLastName(customerDto.getLastName());
                customer.setEmail(customerDto.getEmail());
                customer.setPassword(passwordEncoder.encode(customerDto.getPassword()));
                customer.setDayOfBirth(customerDto.getDayOfBirth());
                customer.setUpdatedAt(LocalDateTime.now());
                customer.setGender(customerDto.getGender());
                customer.setRole(roleRepo.findByRoleName(ERoleType.ROLE_USER));
                customer.setPhone(customerDto.getPhone());
                customerRepo.save(customer);
            });
            return modelMapper.map(customerDto,CustomerResponseDto.class);
        }catch (Exception ex)
        {
            throw new ApiRequestException("update fail",HttpStatus.NOT_MODIFIED);
        }
    }

    @Override
    public List<CustomerResponseDto> findCustomerById(Long id) {
        Optional<Customer> customers = customerRepo.findById(id);

        if(customers.isEmpty())
        {
            throw new ApiRequestException("customer not found",HttpStatus.NOT_FOUND);
        }else{
            return customers.stream().map(customer -> modelMapper.map(customer,CustomerResponseDto.class)).collect(Collectors.toList());
        }
    }

    @Override
    public List<CustomerResponseDto> findListCustomer(int page, int size) {
        try {
            return customerRepo.findListCustomer(page,size)
                    .stream()
                    .map(customer -> modelMapper.map(customer,CustomerResponseDto.class))
                    .collect(Collectors.toList());
        }catch (Exception ex)
        {
            throw new ApiRequestException(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
