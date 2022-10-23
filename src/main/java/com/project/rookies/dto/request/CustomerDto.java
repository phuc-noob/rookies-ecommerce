package com.project.rookies.dto.request;

import com.fasterxml.jackson.annotation.JsonValue;
import com.project.rookies.entities.enums.EGender;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
public class CustomerDto {
    @NotBlank(message = "firstname is require")
    private String firstName;
    @NotBlank(message = "lastname is require")
    private String lastName;
    @NotBlank(message = "phone is require")
    private String phone;
    @Email@NotBlank(message = "email is require")
    private String email;
    @NotBlank(message = "password is require")
    private String password;
    @NotBlank(message = "address is require")
    private String address;
    private EGender gender;
    private LocalDateTime dayOfBirth;
}
