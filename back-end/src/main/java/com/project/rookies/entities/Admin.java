package com.project.rookies.entities;

import jdk.jfr.Relational;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "admin_id", nullable = false)
    private Long adminId;
    @Column(name = "admin_name", length = 100, unique = true)
    private String adminName;
    private String password;
    @OneToOne
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    private Role role;
}
