package com.project.rookies.exceptions.handlers;

import com.project.rookies.dto.response.ErrorResponseDto;
import com.project.rookies.exceptions.DuplicateValueInResourceException;
import com.project.rookies.exceptions.ResourceNotFoundException;
import com.project.rookies.exceptions.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.ZonedDateTime;

@ControllerAdvice
public class GlobalExceptionsHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ResourceNotFoundException.class})
    protected ResponseEntity<ErrorResponseDto> handleResourceNotFoundException(RuntimeException exception) {
        ErrorResponseDto error = new ErrorResponseDto(
                HttpStatus.NOT_FOUND.value(),
                "resource not found",
                exception.getMessage().toString(),
                ZonedDateTime.now()
        );
        return new ResponseEntity<ErrorResponseDto>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({DuplicateValueInResourceException.class})
    protected ResponseEntity<ErrorResponseDto> handleDuplicateValueInResource(RuntimeException exception) {
        ErrorResponseDto error = new ErrorResponseDto(
                HttpStatus.BAD_REQUEST.value(),
                "resource was existed",
                exception.getMessage().toString(),
                ZonedDateTime.now()
        );
        return new ResponseEntity<ErrorResponseDto>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ValidationException.class})
    protected ResponseEntity<ErrorResponseDto> handleValidationException(RuntimeException exception, WebRequest request) {
        ErrorResponseDto error = new ErrorResponseDto(
                HttpStatus.BAD_REQUEST.value(),
                "validation fail",
                exception.getMessage().toString(),
                ZonedDateTime.now()
        );
        return new ResponseEntity<ErrorResponseDto>(error, HttpStatus.BAD_REQUEST);
    }
}
