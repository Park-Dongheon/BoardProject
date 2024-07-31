package com.example.demo.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Location;

@RestController
@RequestMapping("/api/locations")
public class LocationController {
	
    @GetMapping
    public List<Location> getLocations() {
        List<Location> locations = Arrays.asList(
            new Location(37.5665, 126.978),
            new Location(35.1796, 129.0756)
            // 추가적인 위치 데이터
        );
        return locations;
    }
    
}
