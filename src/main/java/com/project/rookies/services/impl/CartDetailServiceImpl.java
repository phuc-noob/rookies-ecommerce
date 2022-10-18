package com.project.rookies.services.impl;

import com.project.rookies.dto.request.CartDetailDto;
import com.project.rookies.dto.response.CartDetailResponseDto;
import com.project.rookies.dto.response.CartResponseDto;
import com.project.rookies.entities.CartDetail;
import com.project.rookies.entities.Product;
import com.project.rookies.repositories.CartDetailRepo;
import com.project.rookies.repositories.ProductRepo;
import com.project.rookies.services.inf.ICartDetailService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartDetailServiceImpl implements ICartDetailService {
    private final ProductRepo productRepo;
    private final CartDetailRepo cartDetailRepo;
    private final ModelMapper modelMapper;
    @Override
    public CartDetailResponseDto saveCartDetail(CartDetailDto cartDetailDto, Long proId) {
        Product product = productRepo.getById(proId);
        CartDetail cartDetail = modelMapper.map(cartDetailDto,CartDetail.class);
        cartDetail.setProduct(product);
        return modelMapper.map(cartDetailRepo.save(cartDetail), CartDetailResponseDto.class) ;
    }
}
