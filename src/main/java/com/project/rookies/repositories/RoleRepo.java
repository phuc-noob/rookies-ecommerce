package com.project.rookies.repositories;

import com.project.rookies.entities.Role;
import com.project.rookies.entities.enums.ERoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Role,Long> {
    Role findByRoleName(ERoleType rolename);
}
