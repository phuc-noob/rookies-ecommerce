package com.project.rookies.dto.response;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class HttpResponseDto {
    public static void responseMessage(HttpServletResponse response, String message, HttpStatus httpStatus) {
        try{
            Map<String,Object> apiResponse = new HashMap<>();
            apiResponse.put("statusCode",httpStatus.value());
            apiResponse.put("message",message);
            apiResponse.put("httpStatus",httpStatus);
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(),apiResponse);
        }catch (Exception ex)
        {
            throw new RuntimeException();
        }
    }
}
