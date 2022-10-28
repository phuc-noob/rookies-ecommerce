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
    private String firstName;
    private String lastName;
}
