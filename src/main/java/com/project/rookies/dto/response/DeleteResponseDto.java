package com.project.rookies.dto.response;

import lombok.*;
import org.springframework.http.HttpStatus;


@Data
@RequiredArgsConstructor
public class DeleteResponseDto {
    private final String message;
    private final int statusCode;
    private final HttpStatus httpStatus;
}
