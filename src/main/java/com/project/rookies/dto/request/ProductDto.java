package com.project.rookies.dto.request;

import com.fasterxml.jackson.annotation.JsonValue;
import com.project.rookies.entities.enums.EProductStatus;
import lombok.Getter;
import lombok.Setter;
@Getter@Setter
public class ProductDto {
    private String productName;
    private String description;
    private float price;
    private int amount;
    private int totalSold;
    @JsonValue
    private EProductStatus status;
}
