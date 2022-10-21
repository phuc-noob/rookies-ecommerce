package com.project.rookies.repositories;

import com.project.rookies.dto.response.BillOrderResponseDto;
import com.project.rookies.entities.BillOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface BillOrderRepo extends JpaRepository<BillOrder, Long> {
    @Query(value = "select * from bill_order bo order by created_at desc limit :size offset :page ",nativeQuery = true)
    List<BillOrder> getListOrder(@Param("page") int page,@Param("size") int size);
}
