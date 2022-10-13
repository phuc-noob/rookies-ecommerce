package com.project.rookies.repositories;

import com.project.rookies.entities.BillOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillOrderRepo extends JpaRepository<BillOrder,Long> {
}
