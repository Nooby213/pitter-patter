package com.pitpat.pitterpatter.domain.child.service;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildRequestDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildResponseDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildUpdateDTO;
import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.UserEntity;
import com.pitpat.pitterpatter.entity.enums.Gender;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ChildService {
    List<ChildResponseDTO> getChildrenByUserId(int userId);

    void addChild(int userId, ChildRequestDTO childRequestDTO);

    void childExceptionHandling(List<ChildResponseDTO> children);

    void userExceptionHandling(UserEntity user);

    ChildResponseDTO getChildById(Long childId);

    void updateChild(Long childId, ChildUpdateDTO childUpdateDTO);

    void deleteChild(Long childId);
}
