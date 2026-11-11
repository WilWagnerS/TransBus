package com.example.transbus.infra.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception{

        return http.cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/auth/login",
                                        "/swagger-ui/**",
                                        "/webjars/**",
                                        "/swagger-resources/**",
                                        "/v3/api-docs/**"
                                ).permitAll()
                                .requestMatchers(HttpMethod.POST, "/usuarios/admin")
                                .permitAll()
                                .requestMatchers(HttpMethod.POST, "/marcas-veiculo/criar")
                                .permitAll()
                                .requestMatchers(HttpMethod.OPTIONS)
                                .permitAll()
                                // Qualquer usuário logado pode consultar os próprios dados
                                .requestMatchers("/usuarios/buscarusuariologado")
                                .authenticated()
                                // Somente ADMIN gerencia usuários (o funcionário ROLE_USER não acessa)
                                .requestMatchers("/usuarios/**")
                                .hasRole("ADMIN")
                                .anyRequest().authenticated()
                        // TESTE 2 (apresentação): para desabilitar a segurança,
                        // comente a linha de cima e descomente a de baixo:
                        //.anyRequest().permitAll()
                )
                .addFilterBefore( jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}