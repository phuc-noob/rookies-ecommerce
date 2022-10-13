package com.project.rookies.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "image_url",columnDefinition = "TEST")
    private String imageURL;
    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product product;
}
