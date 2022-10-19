package com.project.rookies.controllers;

import com.project.rookies.dto.request.RateDto;
import com.project.rookies.dto.response.RateResponseDto;
import com.project.rookies.services.inf.IRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}
