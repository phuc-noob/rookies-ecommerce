package com.project.rookies.services.impl;

import com.project.rookies.dto.request.BillOrderDto;
import com.project.rookies.dto.request.OrderDetailDto;
import com.project.rookies.dto.response.BillOrderResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.entities.BillOrder;
import com.project.rookies.entities.Customer;
import com.project.rookies.entities.OrderDetail;
import com.project.rookies.entities.enums.EOrderStatus;
import com.project.rookies.exceptions.ResourceFoundException;
import com.project.rookies.exceptions.ResourceNotFoundException;
import com.project.rookies.exceptions.ValidationException;
import com.project.rookies.mappers.OrderMapper;
import com.project.rookies.repositories.BillOrderRepo;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.repositories.OrderDetailRepo;
import com.project.rookies.repositories.ProductRepo;
import com.project.rookies.services.inf.IBillOrderService;

import com.project.rookies.services.inf.IOrderDetailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class BillOrderServiceImpl implements IBillOrderService {
    private final BillOrderRepo billOrderRepo;
    private final ProductRepo productRepo;
    private final OrderMapper orderMapper;
    private final OrderDetailRepo orderDetailRepo;
    private final CustomerRepo customerRepo;
    private final ModelMapper modelMapper;
    private final IOrderDetailService orderDetailService;

    @Override
    public BillOrderResponseDto saveBillOrder(BillOrderDto billOrderDto) {
        // case : validate customer
        if (!isValidCustomerForOrder(customerRepo.getById(billOrderDto.getCustomerId())))
            throw new ValidationException("address and phone is required");

        // case : validate order detail
        BillOrder billOrder = modelMapper.map(billOrderDto, BillOrder.class);
        if (isValidQuantityProductInOrder(billOrderDto) != null)
            throw new ValidationException("product quantity not enough " + isValidQuantityProductInOrder(billOrderDto));

        // case : create bill order
        billOrder.setCreatedAt(LocalDateTime.now());
        billOrder.setUpdatedAt(LocalDateTime.now());
        billOrder.setStatus(EOrderStatus.ORDERED);
        billOrder = billOrderRepo.save(billOrder);
        billOrder.setTotalPrice(0);
        float total =0;
        for (OrderDetailDto orderDetailDto : billOrderDto.getOrderDetails()) {
            OrderDetail orderDetail = modelMapper.map(orderDetailDto, OrderDetail.class);
            orderDetail.setUnitPrice(productRepo.getById(orderDetailDto.getProductId()).getPrice());
            orderDetail.setOrderItemPrice(orderDetailService.getOrderDetailPrice(orderDetail));
            orderDetail.setBillOrder(billOrder);
            total+=(orderDetail.getUnitPrice()*orderDetailDto.getAmount());
            billOrder.getOderDetails().add(orderDetailRepo.save(orderDetail));
        }

        billOrder.setTotalPrice(total);

        return orderMapper.mapEntityToDto(billOrderRepo.save(billOrder));
    }

    @Override
    public Boolean isValidCustomerForOrder(Customer customer) {
        if (customer.getAddress() == null
                || customer.getPhone() == null)
            return false;
        return true;
    }

    @Override
    public String isValidQuantityProductInOrder(BillOrderDto billOrderDto) {
        String productName = null;
        for (OrderDetailDto orderDetailDto : billOrderDto.getOrderDetails()) {
            if (productRepo.getById(orderDetailDto.getProductId()).getAmount() < orderDetailDto.getAmount()) {
                productName = productRepo.getById(orderDetailDto.getProductId()).getProductName();
                break;
            }
        }
        return productName;
    }

    @Override
    public BillOrderResponseDto getOrderById(Long orderId) {
        if (!billOrderRepo.existsById(orderId))
            throw new ResourceNotFoundException("bill order not found");
        return orderMapper.mapEntityToDto(billOrderRepo.getById(orderId));
    }

    @Override
    public List<BillOrderResponseDto> getListOrder(int page, int size) {
        if (page < 0 || size < 0)
            throw new ValidationException("invalid page or size");
        return billOrderRepo.getListOrder(page * size, size)
                .stream()
                .map(billOrder -> orderMapper.mapEntityToDto(billOrder))
                .collect(Collectors.toList());
    }

    @Override
    public DeleteResponseDto deleteOrderById(Long orderId) {
        if (!billOrderRepo.existsById(orderId))
            throw new ResourceNotFoundException("order not found");
        billOrderRepo.deleteById(orderId);
        return new DeleteResponseDto("delete done", HttpStatus.OK);
    }

    @Override
    public BillOrderResponseDto updateOrderStatus(Long orderId, BillOrderDto billOrderDto) {
        if (!billOrderRepo.existsById(orderId))
            throw new ResourceNotFoundException("order not found");
        BillOrder billOrder = billOrderRepo.getById(orderId);
        billOrder.setStatus(billOrderDto.getOrderStatus());
        return orderMapper.mapEntityToDto(billOrderRepo.save(billOrder));
    }

    @Override
    public List<BillOrderResponseDto> getListOrderByCustomer(Long customerId, int page, int size) {
        if(!customerRepo.existsById(customerId))
            throw new ResourceNotFoundException("customer not found");
        return billOrderRepo.getListOrderByCustomer(customerId,page,size)
                .stream()
                .map(item ->orderMapper.mapEntityToDto(item))
                .collect(Collectors.toList());
    }

}
