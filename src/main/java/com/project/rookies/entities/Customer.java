package com.project.rookies.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long customerId;
    @Column(name = "first_name",length = 100)
    private String firstName;
    @Column(name="last_name",length = 100)
    private String lastName;
    @Column(name="phone",length = 20,unique = true)
    private String phone;
    @Column(name="email",length = 50,unique = true)
    private String email;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    private String password;
    private String address;
    @Column(name = "gender",length = 50)
    private String gender;
    @Column(name = "day_of_birth")
    private LocalDateTime dayOfBirth;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    private Role role;
    @OneToMany(mappedBy = "customer")
    private List<Rate> rates;

}
