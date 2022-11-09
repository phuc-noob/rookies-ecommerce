package com.project.rookies.controllers;

import com.project.rookies.dto.request.ForgetPasswordDto;
import com.project.rookies.dto.request.LoginRequestDto;
import com.project.rookies.dto.request.RegisterRequestDto;
import com.project.rookies.dto.response.AuthUserResponseDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.JwtResponseDto;
import com.project.rookies.services.impl.JwtAuthenticationService;
import com.project.rookies.services.inf.ICustomerService;
import com.project.rookies.utils.EmailSenderUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtAuthenticationService jwtAuthenticationService;
    private final ICustomerService customerService;
    @PatchMapping("/forget-password")
    Object getNewPassword(@RequestBody ForgetPasswordDto forgetPasswordDto)
    {
        customerService.resetPassword (forgetPasswordDto.getEmail());
        return Map.of("status", HttpStatus.OK.value());
    }
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
