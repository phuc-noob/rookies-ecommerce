package com.project.rookies.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long productId;
    @Column(name = "product_name",columnDefinition = "TEXT",unique = true)
    private String productName;
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    private float price;
    private int amount;
    @OneToMany(mappedBy = "product")
    List<Rate> rates;
    @OneToMany(mappedBy = "product")
    private List<CartDetail> cartProducts;

}
