package com.project.rookies.services.impl;

import com.project.rookies.dto.request.CartDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.entities.Cart;
import com.project.rookies.entities.Product;
import com.project.rookies.exceptions.DuplicateValueInResourceException;
import com.project.rookies.exceptions.ResourceNotFoundException;
import com.project.rookies.exceptions.ValidationException;
import com.project.rookies.mappers.CartMapper;
import com.project.rookies.repositories.CartRepo;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.repositories.ProductRepo;
import com.project.rookies.services.inf.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements ICartService {
    private final CartRepo cartRepo;
    private final CustomerRepo customerRepo;
    private final ProductRepo productRepo;
    private final CartMapper cartMapper;

    @Override
    public CartResponseDto saveCart(CartDto cartDto) {
        // case : user,product not exist in db
        if (!customerRepo.existsById(cartDto.getCustomerId()))
            throw new ResourceNotFoundException("customer not found");
        if (!productRepo.existsById(cartDto.getProductId()))
            throw new ResourceNotFoundException("product not found");
        // case : cart was exist by customer and product
        if (cartRepo.isExistCart(cartDto.getCustomerId(), cartDto.getProductId()))
            throw new DuplicateValueInResourceException("cart was existed");
        // case : product quantity is less than cart amount
        if (!isValidProductQuantity(productRepo.getById(cartDto.getProductId()),
                cartDto.getAmount()))
            throw new ValidationException("invalid quantity");
        // case : have not existed customer in cart bd
        Cart cart = cartMapper.mapDtoToEntity(cartDto);
        return cartMapper.mapEntityToResponseDto(cartRepo.save(cart));
    }

    @Override
    public CartResponseDto getCartByCartId(Long id) {
        if (!cartRepo.existsById(id))
            throw new ResourceNotFoundException("cart not found");
        return cartMapper.mapEntityToResponseDto(cartRepo.getById(id));
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
        return cartMapper.mapEntityToResponseDto(cartRepo.save(cart));
    }

    @Override
    public DeleteResponseDto deleteCart(Long id) {
        if (!cartRepo.existsById(id))
            throw new ResourceNotFoundException("cart not found");
        cartRepo.deleteById(id);
        return new DeleteResponseDto("delete success", HttpStatus.OK);
    }

    @Override
    public List<CartResponseDto> getAllCartByCustomer(Long customerId) {
        return cartRepo.findAllByCustomer(customerRepo.getById(customerId))
                .stream()
                .map(cart -> cartMapper.mapEntityToResponseDto(cart))
                .collect(Collectors.toList());
    }

    @Override
    public Boolean isValidProductQuantity(Product product, int updateQuantity) {
        if(product.getAmount() < updateQuantity)
            return false;
        else return true;
    }

}
