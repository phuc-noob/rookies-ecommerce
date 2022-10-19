package com.project.rookies.services.inf;

import com.project.rookies.dto.request.CartDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;

public interface ICartService {
    CartResponseDto saveCart(Long cusId);

    CartResponseDto getCartByCartId(Long id);

    CartResponseDto addProductToCart(Long cartId, Long productId, CartDto cartDto);

    float calculateCartPrice(float unitPrice, int amount);

    CartResponseDto updateAmountInCart(CartDto cartDto, Long cartId);

    DeleteResponseDto deleteCart(Long id);
}
