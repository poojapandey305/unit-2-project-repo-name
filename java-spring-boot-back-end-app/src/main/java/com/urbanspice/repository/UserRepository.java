package com.urbanspice.repository;
import com.urbanspice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository

public interface UserRepository extends JpaRepository<User,Long>{
   List <User>FindBYName(String name);
   User FindByEmail(String email);}


