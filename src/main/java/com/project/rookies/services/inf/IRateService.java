package com.project.rookies.services.inf;

import com.project.rookies.dto.request.RateDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.RateResponseDto;
import nonapi.io.github.classgraph.utils.LogNode;

import java.util.List;

public interface IRateService {
    RateResponseDto saveRate(Long cusId, RateDto rateDto);

    RateResponseDto addRateToProduct(Long productId, Long rateId);

    RateResponseDto updateRate(RateDto rateDto, Long rateId);

    DeleteResponseDto deleteRate(Long rateId);

    List<RateResponseDto> getListRateByProduct(Long productId, int page, int size);
    RateResponseDto getRateById(Long rateId);
}
