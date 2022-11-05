package com.project.rookies.dto.response;

import com.project.rookies.entities.enums.ECustomerStatus;
import com.project.rookies.entities.enums.EGender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class CustomerResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String address;
    private EGender gender;
    private LocalDateTime createdAt;
    private ECustomerStatus status;
    private Date dayOfBirth;
}
