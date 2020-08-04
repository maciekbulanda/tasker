package com.maciekbulanda.tasker.config;

import com.maciekbulanda.tasker.config.auth.BasicAuthenticationSuccessHandler;
import com.maciekbulanda.tasker.config.auth.BearerTokenReactiveAuthenticationManager;
import com.maciekbulanda.tasker.config.auth.ServerHttpBearerAuthenticationConverter;
import com.maciekbulanda.tasker.services.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import reactor.core.publisher.Mono;

import java.util.function.Function;

@EnableWebFluxSecurity
public class SecurityConfig {

    private final MyUserDetailsService myUserDetailsService;

    public SecurityConfig(MyUserDetailsService myUserDetailsService) {
        this.myUserDetailsService = myUserDetailsService;
    }

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                .cors().configurationSource(createCorsConfigSource()).and()
                .csrf().disable()
                .authorizeExchange()
                .pathMatchers("/login", "/users")
                .authenticated()
//                .permitAll()
                .and()
                .addFilterAt(basicAuthenticationFilter(), SecurityWebFiltersOrder.HTTP_BASIC)
                .authorizeExchange()
                .pathMatchers("/api/**")
                .authenticated()
                .and()
                .addFilterAt(bearerAuthenticationFilter() , SecurityWebFiltersOrder.AUTHENTICATION);

        return http.build();
    }

    public CorsConfigurationSource createCorsConfigSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedHeader("Authorization");
        config.addExposedHeader("Authorization");
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    private AuthenticationWebFilter bearerAuthenticationFilter() {
        AuthenticationWebFilter bearerAuthenticationFilter;
        ReactiveAuthenticationManager authManager;
        ServerAuthenticationConverter bearerConverter;
        authManager  = new BearerTokenReactiveAuthenticationManager();

        bearerAuthenticationFilter = new AuthenticationWebFilter(authManager);
        bearerConverter = new ServerHttpBearerAuthenticationConverter();
        bearerAuthenticationFilter.setServerAuthenticationConverter(bearerConverter);
        bearerAuthenticationFilter.setRequiresAuthenticationMatcher(ServerWebExchangeMatchers.pathMatchers("/api/**"));
        return bearerAuthenticationFilter;
    }

    private AuthenticationWebFilter basicAuthenticationFilter() {

        AuthenticationWebFilter basicAuthenticationFilter;
        UserDetailsRepositoryReactiveAuthenticationManager authManager;
        ServerAuthenticationSuccessHandler successHandler;

        authManager = new UserDetailsRepositoryReactiveAuthenticationManager(myUserDetailsService);
        successHandler = new BasicAuthenticationSuccessHandler();

        basicAuthenticationFilter = new AuthenticationWebFilter(authManager);
        basicAuthenticationFilter.setAuthenticationSuccessHandler(successHandler);
        return basicAuthenticationFilter;
    }
}
