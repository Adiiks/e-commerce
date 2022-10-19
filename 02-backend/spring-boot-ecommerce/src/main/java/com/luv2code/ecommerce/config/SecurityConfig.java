package com.luv2code.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeRequests()
                .antMatchers("/api/orders/**").authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt();

        httpSecurity.cors();

        httpSecurity.csrf().disable();

        httpSecurity.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        Okta.configureResourceServer401ResponseBody(httpSecurity);

        return httpSecurity.build();
    }
}
