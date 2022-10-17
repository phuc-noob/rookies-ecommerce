package com.project.rookies.controllers;

import com.project.rookies.dto.request.CartDetailDto;
import com.project.rookies.dto.request.CartDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.services.inf.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CartController {
    private final ICartService cartService;
    @PostMapping("/customer/{cusId}/cart")
    CartResponseDto saveCartByCustomer(@RequestBody CartDto cartDto, @PathVariable Long cusId)
    {
         return cartService.saveCart(cartDto,cusId);
    }
    @PutMapping("/cart/{cartId}/cart-detail/{cartDetailId}")
    CartResponseDto addCartDetailToCart(@PathVariable Long cartId, @PathVariable Long cartDetailId)
    {
        return cartService.addCartDetailToCart(cartId,cartDetailId);
    }
    @GetMapping("cart/{id}")
    CartResponseDto getCart(@PathVariable Long id)
    {
        return null;
    }
}
