package com.project.rookies.controllers;

import com.project.rookies.dto.request.ProductDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.entities.enums.EProductStatus;
import com.project.rookies.services.inf.IProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;

    @PostMapping
    ProductResponseDto saveProduct(@Valid @RequestBody ProductDto productDto) {
        return productService.saveProduct(productDto);
    }

    @PutMapping("/{id}")
    ProductResponseDto updateProduct(@Valid @RequestBody ProductDto productDto, @PathVariable Long id) {
        return productService.updateProduct(productDto, id);
    }

    @GetMapping("/{id}")
    ProductResponseDto getProduct(@PathVariable Long id) {
        return productService.getProductById(id);
    }
    @DeleteMapping("/{id}")
    DeleteResponseDto deleteProduct(@PathVariable Long id) {
        return productService.updateProductStatus(EProductStatus.DELETED, id);
    }

    @GetMapping
    List<ProductResponseDto> getListProduct(@RequestParam(name = "category",required = false ) List<Long> categories,
                        @RequestParam(name = "price",required = false,defaultValue = "0") float price,
                        @RequestParam(name = "page", required = true) int page,
                        @RequestParam(name = "rating" ,required = false,defaultValue = "0")float rate,
                        @RequestParam(name = "priceOn", required = false,defaultValue = "1000000") float priceOn,
                        @RequestParam(name = "size",required = true) int size) {
        return productService.getListProduct(categories,rate,price,priceOn,page,size);
    }
}
