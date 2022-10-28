package com.project.rookies.services.impl;

import com.project.rookies.entities.Role;
import com.project.rookies.entities.enums.ERoleType;
import com.project.rookies.repositories.RoleRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

public class RoleServiceImplTest {
    RoleRepo roleRepo;
    RoleServiceImpl roleService;
    Role role;
    Role expectRole;
    @BeforeEach
    void beforeEach(){
        roleRepo = mock(RoleRepo.class);
        roleService = new RoleServiceImpl(roleRepo);
        role = Role.builder().roleName(ERoleType.ROLE_USER).roleId(10l).build();
    }
    @Test
    void saveRole_ShouldReturnRole_WhenDataValid()
    {
        when(roleRepo.save(role)).thenReturn(expectRole);
        Role result = roleService.saveRole(role);
        assertThat(result,is(expectRole));
    }

}


