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
    @Column(name = "content",columnDefinition = "TEXT")
    private String content;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    private float point;
    private boolean status;
    @ManyToOne
    @MapsId("customerId")
    private Customer customer;
    @ManyToOne
    @MapsId("productId")
    private Product product;
}
