package com.project.rookies.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthUserResponseDto {
    private String firstName;
    private String lastName;
}
