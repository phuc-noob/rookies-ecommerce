package com.project.rookies.mappers;

import com.project.rookies.dto.response.BillOrderResponseDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.OrderDetailResponseDto;
import com.project.rookies.entities.BillOrder;
import com.project.rookies.repositories.BillOrderRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class OrderMapper {
    private final BillOrderRepo billOrderRepo;
    private final ModelMapper modelMapper;

    public BillOrderResponseDto mapEntityToDto(BillOrder billOrder) {
        return BillOrderResponseDto.builder()
                .id(billOrder.getId())
                .updatedAt(billOrder.getUpdatedAt())
                .customer(modelMapper.map(billOrder.getCustomer(), CustomerResponseDto.class))
                .totalPrice(billOrder.getTotalPrice())
                .paymentDay(billOrder.getPaymentDay())
                .status(billOrder.getStatus())
                .oderDetails(billOrder.getOderDetails().stream().map(orderDetail ->
                                modelMapper.map(orderDetail, OrderDetailResponseDto.class))
                        .collect(Collectors.toList()))
                .build();
    }
}
