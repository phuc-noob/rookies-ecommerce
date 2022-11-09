package com.project.rookies.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ForgetPasswordDto {
    @NotBlank(message = "email is require")
    private String email;
}
