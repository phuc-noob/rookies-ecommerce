package com.project.rookies.repositories;

import com.project.rookies.entities.Product;
import com.project.rookies.entities.enums.EProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ProductRepo extends JpaRepository<Product, Long> {
    Product findProductByProductName(String name);

    Product findProductByProductNameAndStatus(String productName, EProductStatus productStatus);

    @Query(value = "select * from product p where status is true order by total_sold desc,updated_at desc offset :page limit :size ", nativeQuery = true)
    List<Product> getListproduct(@Param("page") int page, @Param("size") int size);

    @Query(value = "select * from product p where status is true order by total_sold desc offset :page limit :size ", nativeQuery = true)
    List<Product> getListProductBestSeller(@Param("page") int page, @Param("size") int size);

    @Modifying
    @Query(value = "update product set status = :status where id = :id", nativeQuery = true)
    int updateProductStatusById(@Param("status") boolean status, @Param("id") Long id);

    @Query(value = "select p.* from product p inner join category_product cp on p.id = cp.product_id " +
            " where cp.category_id = :cateId and status is true order by total_sold desc limit :size offset :page ", nativeQuery = true)
    List<Product> getProductByCategoryId(@Param("cateId") Long cateId, @Param("page") int page, @Param("size") int size);
}
