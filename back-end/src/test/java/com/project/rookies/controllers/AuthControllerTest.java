package com.project.rookies.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.rookies.dto.request.ForgetPasswordDto;
import com.project.rookies.dto.request.LoginRequestDto;
import com.project.rookies.dto.request.RegisterRequestDto;
import com.project.rookies.dto.response.AuthUserResponseDto;
import com.project.rookies.dto.response.CustomerResponseDto;
import com.project.rookies.dto.response.JwtResponseDto;
import com.project.rookies.services.impl.JwtAuthenticationService;
import com.project.rookies.services.inf.ICustomerService;
import com.project.rookies.utils.EmailSenderUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {
    JwtAuthenticationService jwtAuthenticationService;
    AuthController authController;
    ICustomerService customerService;
    RegisterRequestDto registerRequestDto;
    CustomerResponseDto customerResponseDto;
    ForgetPasswordDto forgetPasswordDto;
    @Autowired
    private MockMvc mvc;

    @BeforeEach()
    void beforeEach() {
        forgetPasswordDto = mock(ForgetPasswordDto.class);
        customerResponseDto =mock(CustomerResponseDto.class);
        registerRequestDto =mock(RegisterRequestDto.class);
        jwtAuthenticationService = mock(JwtAuthenticationService.class);
        customerService =mock(ICustomerService.class);
        authController = new AuthController(jwtAuthenticationService,customerService);
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

    @Test
    void registerAccount() throws Exception
    {
        mvc.perform( MockMvcRequestBuilders
                        .get("/api/auth/register", 1)
                        .content(asJsonString(new RegisterRequestDto("f","l","a@gmail.com","000","00","000")))
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isMethodNotAllowed());

    }
    @Test
    void registerAccountShouldReturnCustomerResponseDto_WhenValid()
    {

        when(jwtAuthenticationService.registerAccount((registerRequestDto))).thenReturn(customerResponseDto);
        CustomerResponseDto result = authController.registerAccount(registerRequestDto);
        assertEquals(customerResponseDto,result);
    }

    @Test
    void getNewPassword()
    {
        String email="a@gmail.com";
        boolean test= true;
        Object temp = new Object();
        when(customerService.resetPassword(email)).thenReturn(test);
        Object result = authController.getNewPassword(forgetPasswordDto);
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
