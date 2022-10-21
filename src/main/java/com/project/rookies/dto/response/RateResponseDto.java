package com.project.rookies.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RateResponseDto {
    private Long rateId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private float point;
    private boolean status;
    private Long customerId;
    private Long productId;
}
