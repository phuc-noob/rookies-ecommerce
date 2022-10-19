package com.project.rookies.services.impl;

import com.project.rookies.dto.request.RateDto;
import com.project.rookies.dto.response.RateResponseDto;
import com.project.rookies.entities.Product;
import com.project.rookies.entities.Rate;
import com.project.rookies.exceptions.ResourceNotFoundException;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.repositories.ProductRepo;
import com.project.rookies.repositories.RateRepo;
import com.project.rookies.services.inf.IRateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class RateServiceImpl implements IRateService {
    private final ModelMapper modelMapper;
    private final CustomerRepo customerRepo;
    private final RateRepo rateRepo;
    private final ProductRepo productRepo;

    @Override
    public RateResponseDto saveRate(Long customerId, RateDto rateDto) {
        if (!customerRepo.existsById(customerId))
            throw new ResourceNotFoundException("customer not found");
        Rate rate = modelMapper.map(rateDto, Rate.class);
        rate.setCustomer(customerRepo.getById(customerId));
        rate.setCreatedAt(LocalDateTime.now());
        rate = rateRepo.save(rate);
        return modelMapper.map(
                rateRepo.save(rate), RateResponseDto.class);
    }

    @Override
    public RateResponseDto addRateToProduct(Long productId, Long rateId) {
        if (!rateRepo.existsById(rateId))
            throw new ResourceNotFoundException("rate not found");
        if (!productRepo.existsById(productId))
            throw new ResourceNotFoundException("product not found");
        Rate rate = rateRepo.getById(rateId);
        rate.setProduct(productRepo.getById(productId));
        return modelMapper.map(
                rateRepo.save(rate),
                RateResponseDto.class);
    }
}
