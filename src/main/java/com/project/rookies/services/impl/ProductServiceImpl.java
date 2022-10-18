package com.project.rookies.services.impl;

import com.project.rookies.dto.request.ProductDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.entities.Customer;
import com.project.rookies.entities.Product;
import com.project.rookies.entities.enums.EProductStatus;
import com.project.rookies.exceptions.ApiRequestException;
import com.project.rookies.repositories.ProductRepo;
import com.project.rookies.services.inf.IProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl  implements IProductService {
    private final ProductRepo productRepo;
    private final ModelMapper modelMapper;
    @Override
    public ProductResponseDto saveProduct(ProductDto productDto) {
        // case : product is existed and status is true -> not update
        if(isExistProduct(productDto) && checkProductStatus(productDto.getProductName()))
            throw new ApiRequestException("Product is exist", HttpStatus.BAD_REQUEST);
        // case : product is existed and status is false -> update status is true
        if(isExistProduct(productDto)){
            Product product = productRepo.findProductByProductName(productDto.getProductName());
            modelMapper.map(productDto,product);
            product.setStatus(EProductStatus.ACTIVE);
            productRepo.save(product);

            return modelMapper.map(productRepo.save(product),ProductResponseDto.class) ;
        }else // case : product is not existed -> create new product
        {
            Product product =modelMapper.map(productDto, Product.class);
            product.setCreatedAt(LocalDateTime.now());
            product.setUpdatedAt(LocalDateTime.now());
            product.setStatus(EProductStatus.ACTIVE);
            return modelMapper.map(productRepo.save(product),ProductResponseDto.class) ;
        }
    }
    @Override
    public Boolean isExistProduct(ProductDto productDto) {
        if(productRepo.findProductByProductName(productDto.getProductName()) == null) return false;
        else return true;
    }
    @Override
    public ProductResponseDto updateProduct(ProductDto productDto, Long id) {
        if(!productRepo.existsById(id)) throw new ApiRequestException("product not exist",HttpStatus.NOT_FOUND);
        try {
            ProductResponseDto productResponseDto = new ProductResponseDto();
            productRepo.findById(id).ifPresent(product -> {
                modelMapper.map(productDto,product);
                product.setUpdatedAt(LocalDateTime.now());
                product.setStatus(EProductStatus.ACTIVE);
                modelMapper.map(product,productResponseDto);
                productRepo.save(product);
            });
            return productResponseDto;
        }catch (Exception exception){
            throw new ApiRequestException(exception.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @Override
    public ProductResponseDto getProductById(Long id) {
        if(!productRepo.existsById(id)) throw new ApiRequestException("product not found",HttpStatus.NOT_FOUND);
        return modelMapper.map(productRepo.getById(id),ProductResponseDto.class) ;
    }
    @Override
    public List<ProductResponseDto> getListProduct(int page, int size) {
        if(page<0) throw new ApiRequestException("page not found",HttpStatus.NOT_FOUND);
        return productRepo.getListproduct(page,size)
                .stream()
                .map(product -> modelMapper.map(product,ProductResponseDto.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<ProductResponseDto> getListProductBestSeller(int page, int size) {
        if(page<0) throw new ApiRequestException("page not found",HttpStatus.NOT_FOUND);
        return productRepo.getListProductBestSeller(page, size)
                .stream()
                .map(product -> modelMapper.map(product,ProductResponseDto.class))
                .collect(Collectors.toList());
    }
    @Override
    public DeleteResponseDto updateProductStatus(EProductStatus status, Long id) {
        if(productRepo.existsById(id)){
            Product product = productRepo.getById(id);
            product.setStatus(status);
            productRepo.save(product);
            return new DeleteResponseDto("delete success",HttpStatus.OK.value(), HttpStatus.OK);
        }else {
            return new DeleteResponseDto("delete fail",HttpStatus.NOT_FOUND.value(),HttpStatus.NOT_FOUND);
        }
    }
    @Override
    public Boolean checkProductStatus(String productName) {
        if(productRepo.findProductByProductNameAndStatus(productName,EProductStatus.ACTIVE) == null) return false;
        else return true;
    }

    @Override
    public List<ProductResponseDto> getProductsByCategoryBy(Long id, int page, int size) {
        return productRepo.getProductByCategoryId(id, page, size)
                .stream()
                .map(product -> modelMapper.map(product,ProductResponseDto.class))
                .collect(Collectors.toList());
    }
}
