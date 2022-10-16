package com.project.rookies.controllers;

import com.project.rookies.dto.request.ProductDto;
import com.project.rookies.dto.response.HttpResponseDto;
import com.project.rookies.dto.response.ProductResponseDto;
import com.project.rookies.exceptions.ApiRequestException;
import com.project.rookies.services.inf.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;
    @PostMapping("/product")
    ProductResponseDto saveProduct(@RequestBody ProductDto productDto)
    {
        return productService.saveProduct(productDto);
    }
    @PutMapping("/product/{id}")
    ProductResponseDto updateProduct(@RequestBody ProductDto productDto,@PathVariable Long id)
    {
        return productService.updateProduct(productDto,id);
    }
    @GetMapping("/product/{id}")
    ProductResponseDto getProduct(@PathVariable Long id)
    {
        return productService.getProductById(id);
    }
    @GetMapping("/products")
    List<ProductResponseDto> getListProduct(@RequestParam(name = "page") int page,@RequestParam(name = "size") int size)
    {
        return productService.getListProduct(page,size);
    }
    @GetMapping("/products/best-seller")
    List<ProductResponseDto> getListProductBessSeller(@RequestParam(name = "page") int page, @RequestParam(name = "size") int size)
    {
        return productService.getListProductBestSeller(page,size);
    }
    @DeleteMapping("/product/{id}")
    void deleteProduct(@PathVariable Long id, HttpServletResponse response)
    {
        int checkDelete = productService.updateProductStatus(false,id);
        if(checkDelete == 0) throw new ApiRequestException("delete fail",HttpStatus.BAD_REQUEST);
        else HttpResponseDto.responseMessage(response,"delete success",HttpStatus.OK);
    }
}