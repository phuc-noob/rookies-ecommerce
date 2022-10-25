package com.project.rookies.mappers;

import com.project.rookies.dto.request.CartDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.entities.Cart;
import com.project.rookies.entities.Product;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.repositories.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class CartMapper {
    private final ProductRepo productRepo;
    private final CustomerRepo customerRepo;

    public Cart mapDtoToEntity(CartDto cartDto) {
        return Cart.builder()
                .customer(customerRepo.getById(cartDto.getCustomerId()))
                .product(productRepo.getById(cartDto.getProductId()))
                .amount(cartDto.getAmount())
                .cartPrice(getCartPriceByAmount(
                        productRepo.getById(cartDto.getProductId()),
                        cartDto.getAmount()))
                .build();
    }

    public CartResponseDto mapEntityToResponseDto(Cart cart)
    {
        return CartResponseDto.builder()
                .Id(cart.getId())
                .cartPrice(cart.getCartPrice())
                .updatedAt(cart.getUpdatedAt())
                .createdAt(cart.getCreatedAt())
                .amount(cart.getAmount())
                .productId(cart.getProduct().getProductId())
                .customerId(cart.getCustomer().getCustomerId())
                .build();
    }

    public float getCartPriceByAmount(Product product, int amount) {
        return product.getPrice() * amount;
    }

}
