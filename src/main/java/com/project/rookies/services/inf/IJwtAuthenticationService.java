package com.project.rookies.services.inf;

import com.project.rookies.dto.request.LoginRequestDto;
import com.project.rookies.dto.response.JwtResponseDto;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public interface IJwtAuthenticationService {
    JwtResponseDto authenticationAccount(LoginRequestDto loginRequestDto);
}
