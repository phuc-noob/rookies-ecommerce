package com.project.rookies.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
public class JwtResponseDto {
    public JwtResponseDto(int statusCode, String message, String accessToken, String username, List<String> roles) {
        this.statusCode = statusCode;
        this.message = message;
        this.accessToken = accessToken;
        this.username = username;
        this.roles = roles;
    }

    int statusCode;
    String message;
    String accessToken;
    String username;
    List<String> roles;
}
