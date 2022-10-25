package com.project.rookies.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartResponseDto {
    private Long Id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long productId;
    private int amount;
    private float cartPrice;
    private Long customerId;
}
