package com.project.rookies.dto.request;

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
    private String gender;
    private LocalDateTime dayOfBirth;
}
