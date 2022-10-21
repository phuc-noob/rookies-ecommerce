package com.project.rookies.mappers;

import com.project.rookies.dto.request.RateDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.dto.response.RateResponseDto;
import com.project.rookies.entities.Rate;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.repositories.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RateMapper {
    private final CustomerRepo customerRepo;
    private final ProductRepo productRepo;
    private final ModelMapper modelMapper;
    public Rate mapDtoToEntity(RateDto rateDto)
    {
        return Rate.builder()
                .point(rateDto.getPoint())
                .content(rateDto.getContent())
                .customer(customerRepo.getById(rateDto.getCustomerDtoId()))
                .product(productRepo.getById(rateDto.getProductDtoId()))
                .build();
    }
    public RateResponseDto mapEntityToDto(Rate rate)
    {
        return RateResponseDto.builder()
                .rateId(rate.getRateId())
                .content(rate.getContent())
                .createdAt(rate.getCreatedAt())
                .updatedAt(rate.getUpdatedAt())
                .customerId(rate.getCustomer().getCustomerId())
                .productId(rate.getProduct().getProductId())
                .status(rate.isStatus())
                .build();
    }
}
