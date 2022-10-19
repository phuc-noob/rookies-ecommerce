package com.project.rookies.services.impl;

import com.project.rookies.dto.request.RateDto;
import com.project.rookies.dto.response.DeleteResponseDto;
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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
        rate.setUpdatedAt(LocalDateTime.now());
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

    @Override
    public RateResponseDto updateRate(RateDto rateDto, Long rateId) {
        if (!rateRepo.existsById(rateId))
            throw new ResourceNotFoundException("rate not found");
        Rate rate = rateRepo.getById(rateId);
        rate.setUpdatedAt(LocalDateTime.now());
        modelMapper.map(rateDto, rate);
        return modelMapper.map(rateRepo.save(rate), RateResponseDto.class);
    }

    @Override
    public DeleteResponseDto deleteRate(Long rateId) {
        if (!rateRepo.existsById(rateId))
            throw new ResourceNotFoundException("rate not found");
        rateRepo.deleteById(rateId);
        return new DeleteResponseDto("delete success", HttpStatus.OK.value(), HttpStatus.OK);
    }

    @Override
    public List<RateResponseDto> getListRateByProduct(Long productId, int page, int size) {
        return rateRepo.getListRateByProduct(productId, page, size)
                .stream()
                .map(rate -> modelMapper.map(rate, RateResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public RateResponseDto getRateById(Long rateId) {
        if (!rateRepo.existsById(rateId))
            throw new ResourceNotFoundException("rate not found");
        return modelMapper.map(rateRepo.getById(rateId), RateResponseDto.class);
    }
}
