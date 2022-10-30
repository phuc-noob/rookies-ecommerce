package com.project.rookies.services.impl;

import com.project.rookies.dto.request.ImageDto;
import com.project.rookies.dto.request.ProductDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.entities.Image;
import com.project.rookies.entities.Product;
import com.project.rookies.entities.enums.EProductStatus;
import com.project.rookies.exceptions.DuplicateValueInResourceException;
import com.project.rookies.exceptions.ResourceFoundException;
import com.project.rookies.exceptions.ResourceNotFoundException;
import com.project.rookies.mappers.ProductMapper;
import com.project.rookies.repositories.CategoryRepo;
import com.project.rookies.repositories.ImageRepo;
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
public class ProductServiceImpl implements IProductService {
    private final CategoryRepo categoryRepo;
    private final ProductRepo productRepo;
    private final ModelMapper modelMapper;
    private final ImageRepo imageRepo;
    private final ProductMapper productMapper;

    @Override
    public ProductResponseDto saveProduct(ProductDto productDto) {
        // case : product is existed and status is true -> not update
        if (isExistProduct(productDto) && checkProductStatus(productDto.getProductName()))
            throw new DuplicateValueInResourceException("Product is exist");
        if (!categoryRepo.existsById(productDto.getCategoryId()))
            throw new ResourceNotFoundException("category not found");

        Product product = modelMapper.map(productDto, Product.class);
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        product.setStatus(EProductStatus.ACTIVE);
        product = productRepo.save(product);

        // add product to category
        categoryRepo.getById(productDto.getCategoryId()).getProduct().add(product);

        for (ImageDto imageDto : productDto.getImageDtos()) {
            Image image = modelMapper.map(imageDto, Image.class);
            image.setProduct(product);
            product.getImages().add(imageRepo.save(image));
        }
        return productMapper.mapEntityToDto(product);

    }

    @Override
    public Boolean isExistProduct(ProductDto productDto) {
        if (productRepo.findProductByProductName(productDto.getProductName()) == null) return false;
        else return true;
    }

    @Override
    public ProductResponseDto updateProduct(ProductDto productDto, Long id) {
        if (!productRepo.existsById(id))
            throw new DuplicateValueInResourceException("product not exist");
        try {
            ProductResponseDto productResponseDto = new ProductResponseDto();
            productRepo.findById(id).ifPresent(product -> {
                modelMapper.map(productDto, product);
                product.setUpdatedAt(LocalDateTime.now());
                product.setStatus(EProductStatus.ACTIVE);
                modelMapper.map(product, productResponseDto);
                productRepo.save(product);
            });
            return productResponseDto;
        } catch (Exception exception) {
            throw new ResourceFoundException(exception.getMessage());
        }
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        if (!productRepo.existsById(id)) throw new ResourceNotFoundException("product not found");
        return productMapper.mapEntityToDto(productRepo.getById(id));
    }


    @Override
    public List<ProductResponseDto> getListProduct(int page, int size) {
        if (page < 0) throw new ResourceNotFoundException("page not found");
        return productRepo.getListProduct(page, size)
                .stream()
                .map(product -> modelMapper.map(product, ProductResponseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDto> getListProductByTag(int page, int size, String tag) {
        if (page < 0) throw new ResourceNotFoundException("page not found");
        if (tag.equals("best-seller")) {
            return productRepo.getListProductBestSeller(page, size)
                    .stream()
                    .map(product -> productMapper.mapEntityToDto(product))
                    .collect(Collectors.toList());
        }
        if(tag.isBlank()){
            return productRepo.getListProduct(page, size)
                    .stream()
                    .map(product -> productMapper.mapEntityToDto(product))
                    .collect(Collectors.toList());
        }
        else throw new ResourceNotFoundException("list bét seller not found");
    }

    @Override
    public DeleteResponseDto updateProductStatus(EProductStatus status, Long id) {
        if (productRepo.existsById(id)) {
            Product product = productRepo.getById(id);
            product.setStatus(status);
            productRepo.save(product);
            return new DeleteResponseDto("delete success", HttpStatus.OK);
        } else
            return new DeleteResponseDto("delete fail", HttpStatus.NOT_FOUND);
    }

    @Override
    public Boolean checkProductStatus(String productName) {
        if (productRepo.findProductByProductNameAndStatus(productName, EProductStatus.ACTIVE) == null) return false;
        else return true;
    }

    @Override
    public List<ProductResponseDto> getProductsByCategoryBy(Long id, int page, int size) {
        return productRepo.getProductByCategoryId(id, page, size)
                .stream()
                .map(product -> productMapper.mapEntityToDto(product))
                .collect(Collectors.toList());
    }
}
