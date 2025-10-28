package com.urbanspice.repository;
import com.urbanspice.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface MenuItemRepository extends JpaRepository <MenuItem,Long> {

    //a custom  finder method
    List<MenuItem> findByCategory(String category);
}












