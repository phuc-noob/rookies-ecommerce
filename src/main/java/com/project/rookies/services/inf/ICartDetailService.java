package com.project.rookies.services.inf;

import com.project.rookies.dto.request.CartDetailDto;
import com.project.rookies.dto.response.CartDetailResponseDto;

public interface ICartDetailService {
    CartDetailResponseDto saveCartDetail(CartDetailDto cartDetailDto, Long proId);
}
