package com.project.rookies.controllers;

import com.project.rookies.dto.request.CartDetailDto;
import com.project.rookies.dto.response.CartDetailResponseDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.services.inf.ICartDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class  CartDetailController {
    private final ICartDetailService cartDetailService;
    @PostMapping("/product/{productId}/cart-detail")
    CartDetailResponseDto saveCartDetail(@RequestBody CartDetailDto cartDetailDto, @PathVariable Long productId)
    {
        return cartDetailService.saveCartDetail(cartDetailDto,productId);
    }
}
