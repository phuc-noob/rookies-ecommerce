package com.project.rookies.controllers;

import com.project.rookies.dto.request.RateDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.RateResponseDto;
import com.project.rookies.entities.Rate;
import com.project.rookies.services.inf.IRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RateController {
    private final IRateService rateService;

    @PostMapping("/customer/{customerId}/rate")
    RateResponseDto saveRate(@RequestBody RateDto rateDto, @PathVariable Long customerId) {
        return rateService.saveRate(customerId, rateDto);
    }

    @PutMapping("product/{productId}/rate/{rateId}")
    RateResponseDto addRateToProduct(@PathVariable Long productId, @PathVariable Long rateId) {
        return rateService.addRateToProduct(productId, rateId);
    }

    @PutMapping("rate/{rateId}")
    RateResponseDto updateRate(@RequestBody RateDto rateDto, @PathVariable Long rateId) {
        return rateService.updateRate(rateDto, rateId);
    }

    @DeleteMapping("/rate/{rateId}")
    DeleteResponseDto deleteRate(@PathVariable Long rateId) {
        return rateService.deleteRate(rateId);
    }

    @GetMapping("/product/{productId}/rates")
    List<RateResponseDto> getListRate(@PathVariable Long productId, @RequestParam("page") int page, @RequestParam(name = "size") int size) {
        return rateService.getListRateByProduct(productId, page, size);
    }

    @GetMapping("/rate/{rateId}")
    RateResponseDto getRate(@PathVariable Long rateId)
    {
        return rateService.getRateById(rateId);
    }
}
