package com.pitpat.pitterpatter.domain.user.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 1. Request Header에서 JWT 토큰 추출
        String token = jwtTokenProvider.resolveTokenFromRequestHeader((HttpServletRequest) request);

        System.out.println("JwtAuthenticationFilter 들어옴: " + token);
        // TODO: 잘못된 JWT 토큰이 들어올 경우 예외를 응답으로 던져주기

        // 2. validateToken으로 토큰 유효성 검사
        HttpServletRequest httpReqeust = (HttpServletRequest) request;
        if ((!"/api/user/password/reset".equals(httpReqeust.getRequestURI())) && token != null && jwtTokenProvider.validateToken(token)) {
            System.out.println("JwtAuthenticationFilter 검증됨");
            // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext에 저장
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        // 토큰 정보가 없거나 유효하지 않다면 다음 체인으로 이동
        chain.doFilter(request, response);
    }

}
