package com.project.rookies.dto.response;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import java.time.ZonedDateTime;

@RequiredArgsConstructor
public class ResponseDto {
    private final String message;
    private final int statusCode;
    private final HttpStatus httpStatus;
}
