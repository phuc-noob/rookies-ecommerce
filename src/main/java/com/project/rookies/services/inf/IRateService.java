package com.project.rookies.services.inf;

import com.project.rookies.dto.request.RateDto;
import com.project.rookies.dto.response.RateResponseDto;

public interface IRateService {
    RateResponseDto saveRate(Long cusId, RateDto rateDto);

    RateResponseDto addRateToProduct(Long productId, Long rateId);
}
