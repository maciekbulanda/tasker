package com.maciekbulanda.tasker.config.auth;

import com.maciekbulanda.tasker.config.jwt.JWTTokenService;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class BasicAuthenticationSuccessHandler implements ServerAuthenticationSuccessHandler {

    @Override
    public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange, Authentication authentication) {
        ServerWebExchange exchange = webFilterExchange.getExchange();
        exchange.getResponse()
                .getHeaders()
                .add(HttpHeaders.AUTHORIZATION, getHttpAuthHeaderValue(authentication));
        return webFilterExchange.getChain().filter(exchange);
    }

    private String getHttpAuthHeaderValue(Authentication authentication) {
        return String.join(" ", "Bearer", tokenFromAuthentication(authentication));
    }

    private String tokenFromAuthentication(Authentication authentication) {
        return JWTTokenService.generateToken(authentication.getName(),
                authentication.getCredentials(),
                authentication.getAuthorities());
    }
}
