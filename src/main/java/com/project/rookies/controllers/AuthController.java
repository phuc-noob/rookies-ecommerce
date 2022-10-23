package com.project.rookies.controllers;

import com.project.rookies.dto.request.LoginRequestDto;
import com.project.rookies.dto.response.JwtResponseDto;
import com.project.rookies.filters.jwt.JwtUtil;
import com.project.rookies.services.impl.JwtAuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {
    private final JwtAuthenticationService jwtAuthenticationService;
    @PostMapping("/login")
    JwtResponseDto  authenticationAccount(@RequestBody LoginRequestDto loginRequestDto) {
        return jwtAuthenticationService.authenticationAccount(loginRequestDto);
    }
}
