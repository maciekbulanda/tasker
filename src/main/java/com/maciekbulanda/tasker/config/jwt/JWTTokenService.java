package com.maciekbulanda.tasker.config.jwt;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.security.core.GrantedAuthority;

import java.time.Period;
import java.util.Collection;
import java.util.Date;

public class JWTTokenService {
    public static String generateToken(String subject, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        SignedJWT signedJWT;
        JWTClaimsSet claimsSet;
        claimsSet = new JWTClaimsSet.Builder()
                .subject(subject)
                .issuer("mb")
                .expirationTime(new Date(new Date()
                        .toInstant()
                        .plus(Period.ofDays(1))
                        .toEpochMilli()))
                .build();
        signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
        try {
            signedJWT.sign(new JWTCustomSigner().getSigner());
        } catch (JOSEException e) {
            e.printStackTrace();
        }
        return signedJWT.serialize();
    }
}
