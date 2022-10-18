package com.project.rookies.services.impl;

import com.project.rookies.entities.Role;
import com.project.rookies.repositories.RoleRepo;
import com.project.rookies.services.inf.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements IRoleService {
    private final RoleRepo roleRepo;
    @Override
    public Role saveRole(Role role) {
        return roleRepo.save(role);
    }
}
