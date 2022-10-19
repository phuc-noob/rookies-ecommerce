package com.project.rookies.services.impl;

import com.project.rookies.dto.request.CartDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.entities.Cart;
import com.project.rookies.entities.Product;
import com.project.rookies.exceptions.DuplicateValueInResourceException;
import com.project.rookies.exceptions.ResourceFoundException;
import com.project.rookies.exceptions.ResourceNotFoundException;
import com.project.rookies.repositories.CartRepo;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.repositories.ProductRepo;
import com.project.rookies.services.inf.ICartService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements ICartService {
    private final CartRepo cartRepo;
    private final CustomerRepo customerRepo;
    private final ProductRepo productRepo;
    private final ModelMapper modelMapper;

    @Override
    public CartResponseDto saveCart(Long cusId) {
        // case : user not exist in db
        if (!customerRepo.existsById(cusId))
            throw new ResourceNotFoundException("customer not found");
        // case : have not existed customer in cart bd
        try {
            Cart cart = new Cart();
            cart.setCustomer(customerRepo.getById(cusId));
            cart.setCreatedAt(LocalDateTime.now());
            cart.setUpdatedAt(LocalDateTime.now());
            return modelMapper.map(cartRepo.save(cart), CartResponseDto.class);
        } catch (Exception exception) {
            throw new DuplicateValueInResourceException("cart was existed", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public CartResponseDto getCartByCartId(Long id) {
        if (!cartRepo.existsById(id))
            throw new ResourceNotFoundException("cart not found");
        return modelMapper.map(cartRepo.getById(id), CartResponseDto.class);
    }

    @Override
    public CartResponseDto addProductToCart(Long cartId, Long productId, CartDto cartDto) {
        if (!cartRepo.existsById(cartId))
            throw new ResourceNotFoundException("cart not found");
        if (!productRepo.existsById(productId))
            throw new ResourceNotFoundException("product not found");
        Cart cart = cartRepo.getById(cartId);

        modelMapper.map(cartDto, cart);
        cart.setProduct(productRepo.getById(productId));
        cart.setCartPrice(calculateCartPrice(
                productRepo.getById(productId).getPrice(),
                cartDto.getAmount()));
        CartResponseDto cartResponseDto = modelMapper.map(cartRepo.save(cart), CartResponseDto.class);
        return cartResponseDto;
    }

    @Override
    public float calculateCartPrice(float unitPrice, int amount) {
        return unitPrice * amount;
    }

    @Override
    public CartResponseDto updateAmountInCart(CartDto cartDto, Long cartId) {
        if (!cartRepo.existsById(cartId))
            throw new ResourceNotFoundException("cart not found");
        Cart cart = cartRepo.getById(cartId);
        cart.setAmount(cartDto.getAmount());
        cart.setCartPrice(calculateCartPrice(cart.getProduct().getPrice(),
                cartDto.getAmount())
        );
        return modelMapper.map(cartRepo.save(cart), CartResponseDto.class);
    }

    @Override
    public DeleteResponseDto deleteCart(Long id) {
        if (!cartRepo.existsById(id))
            throw new ResourceNotFoundException("cart not found");
        cartRepo.deleteById(id);
        return new DeleteResponseDto("delete success", HttpStatus.OK.value(), HttpStatus.OK);
    }

}
