package com.project.rookies.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cart_id", nullable = false)
    private Long Id;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @OneToOne(cascade =CascadeType.ALL)
    @JoinColumn(name = "customer_id",referencedColumnName = "id")
    private Customer customer;
    private boolean status;
    @OneToMany(mappedBy = "cart")
    private List<CartDetail> productList;
}
