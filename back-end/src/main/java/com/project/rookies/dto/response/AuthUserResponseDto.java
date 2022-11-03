package com.project.rookies.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class AuthUserResponseDto {
    private int status;
    private Long customerId;
    private String firstName;
    private String lastName;
    private String roleName;
    private String phone;
    private String email;
    private String address;
}
