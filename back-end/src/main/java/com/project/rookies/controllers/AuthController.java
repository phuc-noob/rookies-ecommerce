package com.project.rookies.controllers;

import com.project.rookies.dto.request.LoginRequestDto;
import com.project.rookies.dto.request.RegisterRequestDto;
import com.project.rookies.dto.response.AuthUserResponseDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.JwtResponseDto;
import com.project.rookies.services.impl.JwtAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtAuthenticationService jwtAuthenticationService;
    @PostMapping("/login")
    JwtResponseDto  authenticationAccount(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        return jwtAuthenticationService.authenticationAccount(loginRequestDto);
    }
    @PostMapping("/register")
    CustomerResponseDto registerAccount(@Valid @RequestBody RegisterRequestDto registerRequestDto)
    {
        return jwtAuthenticationService.registerAccount(registerRequestDto);
    }
    @GetMapping
    AuthUserResponseDto authUserRequest(@RequestHeader(name = "Authorization") String requestHeader)
    {
        return jwtAuthenticationService.authRequestHeader(requestHeader);
    }
}
