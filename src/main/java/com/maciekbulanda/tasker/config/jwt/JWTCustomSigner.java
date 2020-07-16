package com.maciekbulanda.tasker.config.jwt;

import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.KeyLengthException;
import com.nimbusds.jose.crypto.MACSigner;

public class JWTCustomSigner {
    private JWSSigner signer;

    public JWTCustomSigner() {
        try {
            signer = new MACSigner("VsYd9LcnTvZibPmAYAnFbxY8mKQ0BFn1Ts392tyjSeKk95JIFsusHGkAnQcwmaci");
        } catch(KeyLengthException e) {
            signer = null;
        }
    }

    public JWSSigner getSigner() {
        return signer;
    }
}
