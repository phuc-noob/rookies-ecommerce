package com.project.rookies.entities;

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
    private boolean status ;
    private float total_price;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @Column(name = "payment_date")
    private LocalDateTime paymentDay;
    @ManyToOne
    @MapsId("customerId")
    private Customer customer;
}
