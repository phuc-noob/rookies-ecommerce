package com.project.rookies.dto.request;

import com.fasterxml.jackson.annotation.JsonValue;
import com.project.rookies.entities.enums.EProductStatus;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class ProductDto {
    private String productName;
    private String description;
    @NotNull
    private Long categoryId;
    private float price;
    private int amount;
    private int totalSold;
    @JsonValue
    private EProductStatus status;
    List<ImageDto> imageDtos;
}
