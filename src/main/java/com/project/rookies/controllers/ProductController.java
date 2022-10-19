package com.project.rookies.controllers;

import com.project.rookies.dto.request.ProductDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.entities.enums.EProductStatus;
import com.project.rookies.services.inf.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;

    @PostMapping("/product")
    ProductResponseDto saveProduct(@RequestBody ProductDto productDto) {
        return productService.saveProduct(productDto);
    }

    @PutMapping("/product/{id}")
    ProductResponseDto updateProduct(@RequestBody ProductDto productDto, @PathVariable Long id) {
        return productService.updateProduct(productDto, id);
    }

    @GetMapping("/product/{id}")
    ProductResponseDto getProduct(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/products")
    List<ProductResponseDto> getListProduct(@RequestParam(name = "page") int page, @RequestParam(name = "size") int size) {
        return productService.getListProduct(page, size);
    }

    @GetMapping("/products/best-seller")
    List<ProductResponseDto> getListProductBessSeller(@RequestParam(name = "page") int page, @RequestParam(name = "size") int size) {
        return productService.getListProductBestSeller(page, size);
    }

    @DeleteMapping("/product/{id}")
    @ResponseBody
    DeleteResponseDto deleteProduct(@PathVariable Long id) {
        return productService.updateProductStatus(EProductStatus.DELETED, id);
    }
}
