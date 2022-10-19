package com.project.rookies.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter

public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "rate_id", nullable = false)
    private Long rateId;
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    private float point;
    private boolean status;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = true)
    private Product product;
}
