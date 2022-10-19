package com.project.rookies.controllers;

import com.project.rookies.dto.request.CartDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.services.inf.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CartController {
    private final ICartService cartService;

    @PostMapping("/customer/{cusId}/cart")
    CartResponseDto saveCartByCustomer(@PathVariable Long cusId) {
        return cartService.saveCart(cusId);
    }

    @GetMapping("/cart/{id}")
    CartResponseDto getCart(@PathVariable Long id) {
        return cartService.getCartByCartId(id);
    }

    @PutMapping("/cart/{cartId}/product/{productId}")
    CartResponseDto addProductToCart(@RequestBody CartDto cartDto, @PathVariable Long cartId, @PathVariable Long productId) {
        return cartService.addProductToCart(cartId, productId, cartDto);
    }

    @PatchMapping("/cart/{cartId}")
    CartResponseDto updateAmountOfProductInCart(@RequestBody CartDto cartDto, @PathVariable Long cartId) {
        return cartService.updateAmountInCart(cartDto, cartId);
    }

    @DeleteMapping("/cart/{cartId}")
    DeleteResponseDto deleteCart(@PathVariable Long cartId) {
        return cartService.deleteCart(cartId);
    }
}
