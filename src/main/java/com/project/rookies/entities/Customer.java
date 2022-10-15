package com.project.rookies.entities;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter
@RequiredArgsConstructor
@AllArgsConstructor
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
    @Email
    @Column(name="email",length = 50,unique = true)
    private String email;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    private Boolean status;
    private String password;
    private String address;
    @Column(name = "gender",length = 50)
    private String gender;
    @Column(name = "day_of_birth")
    private LocalDateTime dayOfBirth;
    @OneToOne
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    private Role role;
    @OneToMany(mappedBy = "customer")
    private List<Rate> rates;
    @OneToMany(mappedBy = "customer" ,cascade = {CascadeType.DETACH})
    private List<BillOrder> billOrders;
}
