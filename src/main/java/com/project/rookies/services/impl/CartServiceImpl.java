package com.project.rookies.services.impl;

import com.project.rookies.dto.request.CartDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.entities.Cart;
import com.project.rookies.exceptions.ApiRequestException;
import com.project.rookies.repositories.CartDetailRepo;
import com.project.rookies.repositories.CartRepo;
import com.project.rookies.repositories.CustomerRepo;
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
    private final CartDetailRepo cartDetailRepo;
    private final CustomerRepo customerRepo;
    private final ModelMapper modelMapper;

    @Override
    public CartResponseDto saveCart(CartDto cartDto, Long cusId) {
        // case : user not exist in db
        if(!customerRepo.existsById(cusId))
            throw new ApiRequestException("customer not found", HttpStatus.NOT_FOUND);
        // case : have not existed customer in cart bd
        try{
            Cart cart = modelMapper.map(cartDto,Cart.class);
            cart.setCustomer(customerRepo.getById(cusId));
            cart.setCreatedAt(LocalDateTime.now());
            cart.setUpdatedAt(LocalDateTime.now());
            return modelMapper.map(cartRepo.save(cart),CartResponseDto.class) ;
        }catch (Exception exception)
        {
            throw new ApiRequestException("cart was existed",HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public CartResponseDto addCartDetailToCart(Long cartId, Long cartDetailId) {
        Cart cart = cartRepo.getById(cartId);
        cart.getProductList().add(cartDetailRepo.getById(cartDetailId));
        return modelMapper.map(cart,CartResponseDto.class);
    }

    @Override
    public CartResponseDto getCartByCartId(Long id) {
        return null;
    }
}
