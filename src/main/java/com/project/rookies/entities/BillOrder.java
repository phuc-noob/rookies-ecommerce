package com.project.rookies.entities;

import com.project.rookies.entities.enums.EOrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    @Enumerated(EnumType.STRING)
    private EOrderStatus status;
    private float totalPrice;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @Column(name = "payment_date")
    private LocalDateTime paymentDay;
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;
    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "order_id")
    private List<OrderDetail> oderDetails =new ArrayList<>();
}
