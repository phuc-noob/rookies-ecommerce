package com.project.rookies.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
@Getter
@Setter
public class RegisterRequestDto {
    @NotBlank(message = "firstName is require")
    String firstName;
    @NotBlank(message = "lastName is require")
    String lastName;
    @Email(message = "not valid email")
    @NotBlank(message = "email is require")
    String email;
    @NotBlank(message = "password is require")
    String password;
    @NotBlank(message = "password is require")
    String confirmPassword;

    public RegisterRequestDto(String f, String l, String email, String password, String confirmPassword, String s) {
    }
}