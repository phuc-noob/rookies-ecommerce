package com.project.rookies.services.impl;

import com.project.rookies.dto.request.LoginRequestDto;
import com.project.rookies.dto.request.RegisterRequestDto;
import com.project.rookies.dto.response.AuthUserResponseDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.JwtResponseDto;
import com.project.rookies.entities.Admin;
import com.project.rookies.entities.Customer;
import com.project.rookies.entities.Role;
import com.project.rookies.entities.enums.ECustomerStatus;
import com.project.rookies.entities.enums.ERoleType;
import com.project.rookies.exceptions.DuplicateValueInResourceException;
import com.project.rookies.exceptions.ResourceNotFoundException;
import com.project.rookies.exceptions.ValidationException;
import com.project.rookies.filters.jwt.JwtUtil;
import com.project.rookies.filters.userprincal.UserPrinciple;
import com.project.rookies.repositories.AdminRepo;
import com.project.rookies.repositories.CustomerRepo;
import com.project.rookies.repositories.RoleRepo;
import com.project.rookies.services.inf.IJwtAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtAuthenticationService implements IJwtAuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final CustomerRepo customerRepo;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;
    private final AdminRepo adminRepo;

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
        if (JwtUtil.getRoleByToken(token).equals("ROLE_USER")){
            Customer customer = customerRepo.findByEmail(JwtUtil.getUsernameByToken(token));
            return new AuthUserResponseDto(
                    200,
                    customer.getCustomerId(),
                    customer.getFirstName(),
                    customer.getLastName(),
                    JwtUtil.getRoleByToken(token),
                    customer.getPhone(),
                    customer.getEmail(),
                    customer.getAddress());
        }else{
            Admin admin = adminRepo.findByAdminName(JwtUtil.getUsernameByToken(token));
            return new AuthUserResponseDto(
                    200,
                    admin.getAdminId(),
                    JwtUtil.getUsernameByToken(token),
                    "",
                    JwtUtil.getRoleByToken(token),
                    "",
                    "","");
        }

    }

    @Override
    public CustomerResponseDto registerAccount(RegisterRequestDto registerRequestDto) {
        if (customerRepo.findByEmail(registerRequestDto.getEmail())!=null)
            throw new DuplicateValueInResourceException("account was existed by email");
        if (!registerRequestDto.getPassword().equals(registerRequestDto.getConfirmPassword()))
            throw new ValidationException("confirm password not correct");
        Customer customer = modelMapper.map(registerRequestDto, Customer.class);
        customer.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
        Role role = roleRepo.findByRoleName(ERoleType.ROLE_USER);
        customer.setRole(role);
        customer.setStatus(ECustomerStatus.ACTIVE);
        customer.setCreatedAt(LocalDateTime.now());
        return modelMapper.map(customerRepo.save(customer), CustomerResponseDto.class);
    }


    @EventListener
    public void onFailure(AbstractAuthenticationFailureEvent failures) {
        throw new ResourceNotFoundException("username or password not correct");
    }
}
