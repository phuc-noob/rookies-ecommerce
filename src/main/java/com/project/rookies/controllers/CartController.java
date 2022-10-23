package com.project.rookies.controllers;

import com.project.rookies.dto.request.CartDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.services.inf.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CartController {
    private final ICartService cartService;

    @PostMapping("/cart")
    CartResponseDto saveCartByCustomer(@Valid @RequestBody CartDto cartDto) {
        return cartService.saveCart(cartDto);
    }

    @GetMapping("/customer/{customerId}/carts")
    List<CartResponseDto> getAllCartByCustomer(@PathVariable Long customerId)
    {
        return cartService.getAllCartByCustomer(customerId);
    }

    @GetMapping("/cart/{id}")
    CartResponseDto getCart(@PathVariable Long id) {
        return cartService.getCartByCartId(id);
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
