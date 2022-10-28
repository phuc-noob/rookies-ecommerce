package com.project.rookies.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RateDto {
    @NotBlank(message = "content is require")
    private String content;
    @NotNull(message = "point is require")
    private float point;
    @NotNull(message = "customerId is require")
    private Long customerDtoId;
    @NotNull(message = "productId is require")
    private Long productDtoId;
}
