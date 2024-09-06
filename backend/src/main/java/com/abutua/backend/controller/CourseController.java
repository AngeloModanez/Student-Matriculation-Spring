package com.abutua.backend.controller;

import com.abutua.backend.model.Course;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
public class CourseController {

    private List<Course> courses = Arrays.asList(
            new Course(1, "ADS"),
            new Course(2, "ADM"),
            new Course(3, "TI"));

    @GetMapping("courses/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable int id) {
        Course cour = courses.stream().filter(c -> c.getId() == id).findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));

        return ResponseEntity.ok(cour);
    }

    @GetMapping("courses")
    public List<Course> getCourses() {
        return courses;
    }
}
