package com.project.rookies.dto.request;

import lombok.Getter;
import lombok.Setter;
@Getter@Setter
public class ProductDto {
    private String productName;
    private String description;
    private float price;
    private int amount;
    private int totalSold;
    private boolean status;
}
