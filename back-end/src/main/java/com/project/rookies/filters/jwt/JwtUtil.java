package com.project.rookies.filters.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtUtil {
    public static String generateJwtToken(Authentication authentication) {
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        return JWT.create()
                .withSubject(authentication.getName())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .withClaim("roles", authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))     // get roles for the token
                .sign(algorithm);
    }

    public static String getUsername(HttpServletRequest request) {
        String username;
        String token = request.getHeader("AUTHORIZATION").substring("Bearer ".length());
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        username = decodedJWT.getSubject();
        return username;
    }
    public static String getUsernameByToken(String token)
    {
        token =token.substring("Bearer ".length());
        String username;
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        username = decodedJWT.getSubject();
        return username;
    }

    public static String[] getRoles(HttpServletRequest request) {
        String token = request.getHeader("AUTHORIZATION").substring("Bearer ".length());
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        String roles[] = decodedJWT.getClaim("roles").asArray(String.class);
        return roles;
    }
}
