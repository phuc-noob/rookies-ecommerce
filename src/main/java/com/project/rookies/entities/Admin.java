package com.project.rookies.entities;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "admin_id", nullable = false)
    private Long admin_id;
    @Column(name = "admin_name",length = 100,unique = true)
    private String adminName;
    private String password;
    @OneToOne(cascade = CascadeType.ALL,fetch =FetchType.EAGER)
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    private Role role;
}
