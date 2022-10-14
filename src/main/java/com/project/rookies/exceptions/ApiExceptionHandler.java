package com.project.rookies.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e){
        ApiException apiException = new ApiException(
                e.getMessage(),
                e.getHttpStatus().value(),
                e.getHttpStatus(),
                ZonedDateTime.now()
        );
        return new ResponseEntity<>(apiException,HttpStatus.BAD_REQUEST);
    }
}
