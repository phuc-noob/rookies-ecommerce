package com.project.rookies.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class BillOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id",referencedColumnName = "cart_id")
    private Cart cart;
    private boolean status ;
    private float total_price;
    @ManyToOne
    @MapsId("customerId")
    private Customer customer;
}
