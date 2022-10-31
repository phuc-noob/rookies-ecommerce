package com.project.rookies.services.impl;

import com.project.rookies.dto.request.LoginRequestDto;
import com.project.rookies.dto.response.AuthUserResponseDto;
import com.project.rookies.dto.response.JwtResponseDto;
import com.project.rookies.exceptions.ResourceNotFoundException;
import com.project.rookies.filters.jwt.JwtUtil;
import com.project.rookies.filters.userprincal.UserPrinciple;
import com.project.rookies.services.inf.IJwtAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtAuthenticationService implements IJwtAuthenticationService {
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtResponseDto authenticationAccount(LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequestDto.getUsername(), loginRequestDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();

        String jwt = JwtUtil.generateJwtToken(authentication);
        List<String> roles = userPrinciple
                .getAuthorities()
                .stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority()).collect(Collectors.toList());
        return new JwtResponseDto(HttpStatus.OK.value(),"login success",jwt, userPrinciple.getUsername(), roles);
    }

    @Override
    public AuthUserResponseDto authRequestHeader(String token) {
        return new AuthUserResponseDto( 200,JwtUtil.getUsernameByToken(token),"this is name",JwtUtil.getRoleByToken(token));
    }

    @EventListener
    public void onFailure(AbstractAuthenticationFailureEvent failures) {
        throw new ResourceNotFoundException("username or password not correct");
    }
}
