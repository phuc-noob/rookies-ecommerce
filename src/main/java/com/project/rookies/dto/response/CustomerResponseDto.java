package com.project.rookies.dto.response;

import com.project.rookies.dto.request.CustomerDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Getter@Setter
@NoArgsConstructor
public class CustomerResponseDto {
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String address;
    private String gender;
    private LocalDateTime dayOfBirth;
}
