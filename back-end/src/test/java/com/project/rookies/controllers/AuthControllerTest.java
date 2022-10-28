package com.project.rookies.controllers;

import com.project.rookies.dto.request.LoginRequestDto;
import com.project.rookies.dto.response.AuthUserResponseDto;
import com.project.rookies.dto.response.JwtResponseDto;
import com.project.rookies.services.impl.JwtAuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class AuthControllerTest {
    JwtAuthenticationService jwtAuthenticationService;
    AuthController authController;

    @BeforeEach()
    void beforeEach() {
        jwtAuthenticationService = mock(JwtAuthenticationService.class);
        authController = new AuthController(jwtAuthenticationService);
    }

    @Test()
    void authenticationAccount_ShouldReturnJwtResponseDto_WhenValid() {
        LoginRequestDto loginRequestDto = mock(LoginRequestDto.class);
        JwtResponseDto expectJwt = mock(JwtResponseDto.class);
        when(jwtAuthenticationService.authenticationAccount(loginRequestDto)).thenReturn(expectJwt);
        JwtResponseDto result = authController.authenticationAccount(loginRequestDto);
        assertEquals(expectJwt, result);
    }

    @Test
    void authUserRequest_ShouldReturnAuthUserResponseDto_WhenValid() {
        String requestHeader = "Bear header";
        AuthUserResponseDto authUserResponseDto = mock(AuthUserResponseDto.class);
        when(jwtAuthenticationService.authRequestHeader(requestHeader)).thenReturn(authUserResponseDto);
        AuthUserResponseDto result = authController.authUserRequest(requestHeader);
        assertEquals(authUserResponseDto, result);
    }
}
