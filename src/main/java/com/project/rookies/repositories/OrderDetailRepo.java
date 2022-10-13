package com.project.rookies.repositories;

import com.project.rookies.entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepo extends JpaRepository<OrderDetail,Long> {
}
