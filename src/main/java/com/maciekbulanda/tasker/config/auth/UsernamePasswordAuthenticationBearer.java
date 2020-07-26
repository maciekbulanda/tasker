package com.maciekbulanda.tasker.config.auth;

import com.nimbusds.jwt.SignedJWT;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import reactor.core.publisher.Mono;

import java.text.ParseException;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * This converter takes a SignedJWT and extracts all information
 * contained to build an Authentication Object
 * The signed JWT has already been verified.
 *
 */
public class UsernamePasswordAuthenticationBearer {

    public static Mono<Authentication> create(SignedJWT signedJWTMono) {
        String subject;
        String auths;

        List<GrantedAuthority> authorities;

        try {
            subject = signedJWTMono.getJWTClaimsSet().getSubject();
            auths = (String) signedJWTMono.getJWTClaimsSet().getClaim("roles");
        } catch (ParseException e) {
            return Mono.empty();
        }
        authorities = Stream.of(auths.split(","))
                .filter(UsernamePasswordAuthenticationBearer::notNull)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

            return  Mono.justOrEmpty(new UsernamePasswordAuthenticationToken(subject, null, authorities));

    }

    private static boolean notNull(String a) {
        return a != null && !a.equals("");
    }
}