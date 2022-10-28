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

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


public class RateServiceImplTest {
    ModelMapper modelMapper;
    RateMapper rateMapper;
    CustomerRepo customerRepo;
    RateRepo rateRepo;
    ProductRepo productRepo;
    RateServiceImpl rateService ;
    Rate rate;
    RateResponseDto expectRole;

    @BeforeEach
    void beforeEach(){
        expectRole = mock(RateResponseDto.class);
        modelMapper = mock(ModelMapper.class);
        rateMapper = mock(RateMapper.class);
        customerRepo = mock(CustomerRepo.class);
        rateRepo = mock(RateRepo.class);
        rate = new Rate();
        expectRole = RateResponseDto.builder().rateId(1L).productId(10L)
                .customerId(10L).content("content")
                .point(10)
                .build();
        productRepo = mock(ProductRepo.class);
        rateService = new RateServiceImpl(modelMapper,rateMapper,customerRepo,rateRepo,productRepo);
    }
    @Test
    void saveRate_ShouldReturnRate_WhenDataValid() {
        RateDto rateDto = RateDto.builder().customerDtoId(10L)
                .point(5).productDtoId(5L)
                .content("content").build();
        ResourceNotFoundException thrown = assertThrows(
                ResourceNotFoundException.class,
                () -> rateService.saveRate(rateDto),
                "customer not found"
        );

        assertTrue(thrown.getMessage().contains("customer not found"));
    }
    @Test
    void saveRate_ShouldThrown_WhenDataValid() {
        RateDto rateDto = RateDto.builder().customerDtoId(10L)
                .point(5).productDtoId(5L)
                .content("content").build();
        when(customerRepo.existsById(rateDto.getCustomerDtoId())).thenReturn(Boolean.TRUE);
        ValidationException thrown = assertThrows(
                ValidationException.class,
                () -> rateService.saveRate(rateDto),
                "must buy product before rate"
        );

        assertTrue(thrown.getMessage().contains("must buy product before rate"));
    }

    @Test
    void saveRate_ShouldReturnRateResponseDto_WhenDataValid() {
        RateDto rateDto = RateDto.builder().customerDtoId(50L)
                .point(5).productDtoId(5L)
                .content("content").build();
        when(customerRepo.existsById(rateDto.getCustomerDtoId())).thenReturn(Boolean.TRUE);
        when(rateRepo.isValidRate(rateDto.getCustomerDtoId(), rateDto.getProductDtoId())).thenReturn(Boolean.TRUE);
        when(rateRepo.isExistRate(rateDto.getCustomerDtoId(), rateDto.getProductDtoId())).thenReturn(Boolean.FALSE);
        when(rateMapper.mapDtoToEntity(rateDto)).thenReturn(rate);
        when(rateRepo.save(rate)).thenReturn(rate);
        when(productRepo.updateProductRatingPoint(rateDto.getProductDtoId())).thenReturn(1);
        when(modelMapper.map(rateRepo.save(rate),RateResponseDto.class)).thenReturn(expectRole);
        RateResponseDto result = rateService.saveRate(rateDto);

        LocalDateTime t = LocalDateTime.now();
        assertThat(result,is(expectRole));
    }

    @Test
    void updateRate_ShouldThrowResourceNotFoundException_WhenDataValid() {
        RateDto rateDto = RateDto.builder().customerDtoId(50L)
                .point(5).productDtoId(5L)
                .content("content").build();
        ResourceNotFoundException thrown = assertThrows(
                ResourceNotFoundException.class,
                () -> rateService.updateRate(rateDto,1L),
                "rate not found"
        );
        assertTrue(thrown.getMessage().contains("rate not found"));
    }

    @Test
    void updateRate_ShouldReturnRateResponseDto_WhenDataValid() {
        Long rateId = 1L;
        rate = mock(Rate.class);
        RateDto rateDto = RateDto.builder().customerDtoId(50L)
                .point(5).productDtoId(5L)
                .content("content").build();
        when(rateRepo.existsById(rateId)).thenReturn(Boolean.TRUE);
        when(rateRepo.getById(rateId)).thenReturn(rate);
        when(rateRepo.save(rate)).thenReturn(rate);
        when(rateMapper.mapEntityToDto(rateRepo.save(rate))).thenReturn(expectRole);
        RateResponseDto result = rateService.updateRate(rateDto,rateId);
        assertEquals(expectRole,result);
    }
    @Test
    void getListRateByProduct_ShouldReturnListRateResponseDto_WhenDataValid()
    {
        Long productId = 1L;
        int page =0 ,size  =5;
        List<RateResponseDto> result = rateService.getListRateByProduct(productId,page,size);
    }
    @Test
    void getRateById_ShouldReturnRateResponseDto_WhenDataValid()
    {
        Long rateId =1L;
        when(rateRepo.existsById(rateId)).thenReturn(Boolean.TRUE);
        RateResponseDto result = rateService.getRateById(rateId);
    }
    @Test
    void getRateById_ShouldThrownResourceNotFoundException_WhenRateNotFound()
    {
        Long rateId =1L;
        ResourceNotFoundException thrown = assertThrows(
                ResourceNotFoundException.class,
                () -> rateService.getRateById(rateId),
                "rate not found"
        );
        assertTrue(thrown.getMessage().contains("rate not found"));
    }
    @Test
    void deleteRate_ShouldReturnDeleteResponseDto_WhenDataValid()
    {
        Long rateId =1L ;
        ResourceNotFoundException thrown = assertThrows(
                ResourceNotFoundException.class,
                () -> rateService.deleteRate(rateId),
                "rate not found"
        );
        assertTrue(thrown.getMessage().contains("rate not found"));

    }

    @Test
    void deleteRate_ShouldThrownResourceNotFoundException_WhenRateNotFound()
    {
        Long rateId =1L ;
        when(rateRepo.existsById(rateId)).thenReturn(Boolean.TRUE);
        DeleteResponseDto result = rateService.deleteRate(rateId);
    }
}
