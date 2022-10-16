package com.project.rookies.repositories;

import com.project.rookies.entities.Category;
import com.project.rookies.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category,Long> {
    Category findByCateName(String cateName);
}
