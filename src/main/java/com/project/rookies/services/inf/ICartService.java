package com.project.rookies.services.inf;

import com.project.rookies.dto.request.CartDetailDto;
import com.project.rookies.dto.request.CartDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.entities.Cart;

public interface ICartService {
    CartResponseDto saveCart(CartDto cartDto,Long cusId);
    CartResponseDto addCartDetailToCart(Long cartId, Long cartDetailId);
    CartResponseDto getCartByCartId(Long id);
}
