package com.project.rookies.repositories;

import com.project.rookies.dto.response.RateResponseDto;
import com.project.rookies.entities.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RateRepo extends JpaRepository<Rate, Long> {
    RateResponseDto findRateByContent(String content);

    @Query(value = "select * from rate where product_id = :productId " +
            "order by created_at desc limit :size offset :page ", nativeQuery = true)
    List<Rate> getListRateByProduct(@Param("productId") Long productId, @Param("page") int page, @Param("size") int size);

    @Query(value = "select case when count(od) > 0 then true else false end" +
            " from bill_order bo inner join order_detail od on bo.id = od.order_id" +
            " where customer_id  = :customerId and product_id = :productId", nativeQuery = true)
    Boolean isValidRate(@Param("customerId") Long customerId, @Param("productId") Long productId);

    @Query(value = "select case when count(c) > 0 then true else false end from rate c "+
            "where customer_id  = :customerId and product_id = :productId", nativeQuery = true)
    boolean isExistRate(@Param("customerId") Long customerId, @Param("productId") Long productId);
}
