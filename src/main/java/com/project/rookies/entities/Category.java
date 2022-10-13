package com.project.rookies.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long cate_id;
    @Column(name = "cate_name",length = 100,unique = true)
    private String cateName;
    @Column(name = "description",columnDefinition = "TEXT")
    private String discription;
    @Column(name = "image",columnDefinition = "TEXT")
    private String image;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    private int amount;
    @ManyToMany
    private List<Product> product;
}
