package com.project.rookies.services.impl;

import com.project.rookies.dto.request.BillOrderDto;
import com.project.rookies.dto.response.BillOrderResponseDto;
import com.project.rookies.entities.BillOrder;
import com.project.rookies.entities.Customer;
import com.project.rookies.exceptions.ApiRequestException;
import com.project.rookies.repositories.BillOrderRepo;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.services.inf.IBillOrderService;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class BillOrderServiceImpl implements IBillOrderService {
    private final BillOrderRepo billOrderRepo ;
    private final CustomerRepo customerRepo;
    private final ModelMapper modelMapper;
    @Override
    public BillOrderResponseDto saveBillOrder(BillOrderDto billOrderDto, Long customerId) {
        if(isExistBillOrder(customerId)){
            throw new ApiRequestException("order was exist", HttpStatus.NOT_MODIFIED);
        }
        BillOrder billOrder = modelMapper.map(billOrderDto,BillOrder.class);
        Customer customer = customerRepo.findById(customerId).get();
        billOrder.setCustomer(customer);
        billOrder.setStatus(true);
        return modelMapper.map(billOrderRepo.save(billOrder),BillOrderResponseDto.class) ;
    }

    @Override
    public Boolean isExistBillOrder(Long customerId) {
        return billOrderRepo.existBillOrderByCustomerQuery(customerId);
    }

}
