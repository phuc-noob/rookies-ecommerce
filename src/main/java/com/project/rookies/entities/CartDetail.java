package com.project.rookies.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter@Setter
@Table(name = "cart_product")
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "cart_id")
    private Cart cart;
    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product product;
    private int mount;
    @Column(name = "cart_product_price")
    private float cartProductPrice;
}
