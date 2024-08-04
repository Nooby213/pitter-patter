package com.pitpat.pitterpatter.domain.user.model.dto;

public interface OAuth2Response {

    // 제공자 (Ex. kakao)
    String getProvider();
    // 제공자에서 발급해주는 아이디(번호)
    String getProviderId();
}