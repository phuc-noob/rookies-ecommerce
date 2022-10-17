package com.project.rookies.entities;

import com.project.rookies.entities.enums.ERoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "role_id", nullable = false)
    private Long roleId;
    @Column(name = "role_name",unique = true)
    @Enumerated(EnumType.STRING)
    private ERoleType roleName;


}
