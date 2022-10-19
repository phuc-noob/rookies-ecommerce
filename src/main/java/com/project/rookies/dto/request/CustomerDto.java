package com.project.rookies.dto.request;

import com.fasterxml.jackson.annotation.JsonValue;
import com.project.rookies.entities.enums.EGender;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
public class CustomerDto {
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password;
    private String address;
    @JsonValue
    private EGender gender;
    private LocalDateTime dayOfBirth;
}
