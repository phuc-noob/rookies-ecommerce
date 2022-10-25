package com.project.rookies.dto.response;

import lombok.*;
import org.springframework.http.HttpStatus;


@Data
public class DeleteResponseDto {
    private String message;
    private int statusCode;
    private final HttpStatus httpStatus;

    public DeleteResponseDto(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.statusCode = httpStatus.value();
    }
}
