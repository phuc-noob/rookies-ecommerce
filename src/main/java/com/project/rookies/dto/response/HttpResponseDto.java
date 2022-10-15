package com.project.rookies.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

public class ApiResponse {
    public static ResponseEntity<Object> responseMessage(String message, HttpStatus httpStatus)
    {
        ResponseDto responseDto = new ResponseDto(message,httpStatus.value(),httpStatus);
        return new ResponseEntity<>(responseDto,HttpStatus.BAD_REQUEST);
    }
}
