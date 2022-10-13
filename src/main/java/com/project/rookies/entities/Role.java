package com.project.rookies.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "role_id", nullable = false)
    private Long roleId;
    @Column(name = "role_name")
    private String roleName;
}
