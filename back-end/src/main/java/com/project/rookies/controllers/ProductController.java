package com.project.rookies.controllers;

import com.project.rookies.dto.request.ProductDto;
import com.project.rookies.dto.response.DeleteResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.entities.enums.EProductStatus;
import com.project.rookies.services.inf.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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


    @GetMapping
    List<ProductResponseDto> getListProductByTag(@RequestParam(name = "tag", required = false,defaultValue = "") String tag, @RequestParam(name = "page") int page, @RequestParam(name = "size") int size) {
        return productService.getListProductByTag(page, size, tag);
    }

    @DeleteMapping("/{id}")
    DeleteResponseDto deleteProduct(@PathVariable Long id) {
        return productService.updateProductStatus(EProductStatus.DELETED, id);
    }
}
