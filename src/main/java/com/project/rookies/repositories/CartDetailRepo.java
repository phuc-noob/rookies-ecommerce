package com.project.rookies.repositories;

import com.project.rookies.entities.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDetailRepo extends JpaRepository<CartDetail,Long> {
}
