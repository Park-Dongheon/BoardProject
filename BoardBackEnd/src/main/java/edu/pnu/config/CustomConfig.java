package edu.pnu.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CustomConfig implements WebMvcConfigurer{

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")							// 모든 주소에 대해서
				.allowedMethods(CorsConfiguration.ALL)		// 모든 Method 에 대해서
				.allowedOrigins(CorsConfiguration.ALL);		// 모든 Origin 에 대해서
	}
	
}
