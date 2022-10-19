package com.project.rookies.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class BillOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    private boolean status;
    private float totalPrice;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @Column(name = "payment_date")
    private LocalDateTime paymentDay;
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;
    @OneToMany(mappedBy = "billOrder", cascade = CascadeType.ALL)
    private List<OrderDetail> oderDetails;
}
