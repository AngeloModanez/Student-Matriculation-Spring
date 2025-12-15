package com.abutua.backend.controller;

import com.abutua.backend.model.Course;

import java.net.URI;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@CrossOrigin
public class CourseController {
  // private List<Course> courses = new ArrayList<>();
  private List<Course> courses = Arrays.asList(
      new Course(1, "ADS"),
      new Course(2, "ADMIN"),
      new Course(3, "TI"));

  @GetMapping("/courses")
  public List<Course> getCourses() {
    return courses;
  }

  @GetMapping("/courses/{id}")
  public ResponseEntity<Course> getCourse(@PathVariable int id) {
    Course course = courses.stream()
        .filter(c -> c.getId() == id)
        .findFirst()
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found!"));

    return ResponseEntity.ok(course);
  }

  @PostMapping("/courses")
  public ResponseEntity<Course> postCourse(@RequestBody Course course) {
    course.setId(courses.size() + 1);
    courses.add(course);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(course.getId())
        .toUri();

    return ResponseEntity.created(location).body(course);
  }

}
