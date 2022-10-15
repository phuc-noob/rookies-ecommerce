package com.project.rookies.repositories;

import com.project.rookies.entities.BillOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface BillOrderRepo extends JpaRepository<BillOrder,Long> {
    @Query("select case when count(c) > 0 then true else false end from BillOrder c where customer_id = :customerId and status is true")
    boolean existBillOrderByCustomerQuery(@Param("customerId") Long customerId);
}
