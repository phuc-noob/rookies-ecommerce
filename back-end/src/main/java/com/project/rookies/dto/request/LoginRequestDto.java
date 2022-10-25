package com.project.rookies.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequestDto {
    @NotBlank(message = "username or email is require")
    String username;
    @NotBlank(message = "password is require")
    String password;
}
