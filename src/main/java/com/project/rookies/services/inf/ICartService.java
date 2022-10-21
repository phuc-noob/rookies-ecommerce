package com.project.rookies.services.inf;

import com.project.rookies.dto.request.CartDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.entities.Product;

import java.util.List;

public interface ICartService {
    CartResponseDto saveCart(CartDto cartDto);

    CartResponseDto getCartByCartId(Long id);

    float calculateCartPrice(float unitPrice, int amount);

    CartResponseDto updateAmountInCart(CartDto cartDto, Long cartId);

    DeleteResponseDto deleteCart(Long id);
    List<CartResponseDto> getAllCartByCustomer(Long customerId);

    Boolean isValidProductQuantity(Product product,int updateQuantity);
}
