package com.project.rookies.entities;

import com.project.rookies.entities.enums.ERoleType;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "role_id", nullable = false)
    private Long roleId;
    @Column(name = "role_name", unique = true)
    @Enumerated(EnumType.STRING)
    private ERoleType roleName;


}
