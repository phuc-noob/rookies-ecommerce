package com.project.rookies.services.inf;

import com.project.rookies.dto.request.LoginRequestDto;
import com.project.rookies.dto.request.RegisterRequestDto;
import com.project.rookies.dto.response.AuthUserResponseDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.JwtResponseDto;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public interface IJwtAuthenticationService {
    JwtResponseDto authenticationAccount(LoginRequestDto loginRequestDto);
    AuthUserResponseDto authRequestHeader(String token);
    CustomerResponseDto registerAccount(RegisterRequestDto registerRequestDto);
}
