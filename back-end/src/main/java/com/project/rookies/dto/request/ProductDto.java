package com.project.rookies.dto.request;

import com.project.rookies.entities.enums.EProductStatus;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    @NotBlank(message = "product name is require")
    private String productName;
    @NotBlank(message = "description is require")
    private String description;
    @NotEmpty(message = "category is require")
    private List<Long> categoryIds;
    @NotNull(message = "price is require")
    private float price;
    @NotNull(message = "amount is require")
    private int amount;
    private EProductStatus status;
    @NotEmpty(message = "image is require")
    List<ImageDto> imageDtos;
}
