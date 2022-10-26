package com.project.rookies.entities;

import com.project.rookies.entities.enums.EProductStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long productId;
    @Column(name = "product_name", columnDefinition = "TEXT")
    private String productName;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    @Column(name = "total_sold")
    private int totalSold;
    @Column(name = "rate_point")
    private float ratePoint;
    private float price;
    private int amount;
    @Enumerated(EnumType.STRING)
    private EProductStatus status;
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private List<Image> images = new ArrayList<>();
    @OneToMany(mappedBy = "product")
    private List<VoucherProduct> vouchers;
}
