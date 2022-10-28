package com.project.rookies.services.impl;

import com.project.rookies.dto.request.RateDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.RateResponseDto;
import com.project.rookies.entities.Rate;
import com.project.rookies.exceptions.DuplicateValueInResourceException;
import com.project.rookies.exceptions.ResourceNotFoundException;
import com.project.rookies.exceptions.ValidationException;
import com.project.rookies.mappers.RateMapper;
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


@Service
@RequiredArgsConstructor
public class RateServiceImpl implements IRateService {
    private final ModelMapper modelMapper;
    private final RateMapper rateMapper;
    private final CustomerRepo customerRepo;
    private final RateRepo rateRepo;
    private final ProductRepo productRepo;

    @Override
    public RateResponseDto saveRate(RateDto rateDto) {
        // case : customer not found
        if (!customerRepo.existsById(rateDto.getCustomerDtoId()))
            throw new ResourceNotFoundException("customer not found");
        // case : customer must buy product before
        if (!rateRepo.isValidRate(rateDto.getCustomerDtoId(), rateDto.getProductDtoId()))
            throw new ValidationException("must buy product before rate");
        // case : is existed rate by customer for product
        if (rateRepo.isExistRate(rateDto.getCustomerDtoId(), rateDto.getProductDtoId()))
            throw new DuplicateValueInResourceException("just one rating for each customer");

        // case : create new rating for product by customer
        Rate rate = rateMapper.mapDtoToEntity(rateDto);
        rate.setCreatedAt(LocalDateTime.now());
        rate.setUpdatedAt(LocalDateTime.now());
        rate = rateRepo.save(rate);

        //update product rating point when rated
        productRepo.updateProductRatingPoint(rateDto.getProductDtoId());
        return modelMapper.map(
                rateRepo.save(rate), RateResponseDto.class);
    }

    @Override
    public RateResponseDto updateRate(RateDto rateDto, Long rateId) {
        if (!rateRepo.existsById(rateId))
            throw new ResourceNotFoundException("rate not found");
        Rate rate = rateRepo.getById(rateId);
        rate.setUpdatedAt(LocalDateTime.now());
        rate.setContent(rate.getContent());
        rate.setPoint(rateDto.getPoint());
        return rateMapper.mapEntityToDto(rateRepo.save(rate));
    }

    @Override
    public DeleteResponseDto deleteRate(Long rateId) {
        if (!rateRepo.existsById(rateId))
            throw new ResourceNotFoundException("rate not found");
        rateRepo.deleteById(rateId);
        return new DeleteResponseDto("delete success", HttpStatus.OK);
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
