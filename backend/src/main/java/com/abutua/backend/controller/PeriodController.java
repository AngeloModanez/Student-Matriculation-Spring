package com.abutua.backend.controller;

import com.abutua.backend.model.Period;

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
public class PeriodController {
  // private List<Period> periods = new ArrayList<>();
  private List<Period> periods = Arrays.asList(
      new Period(1, "Morning"),
      new Period(2, "Afternoon"),
      new Period(3, "Night"));

  @GetMapping("periods")
  public List<Period> getPeriods() {
    return periods;
  }

  @GetMapping("periods/{id}")
  public ResponseEntity<Period> getPeriod(@PathVariable int id) {
    Period period = periods.stream()
        .filter(p -> p.getId() == id)
        .findFirst()
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Period not found!"));

    return ResponseEntity.ok(period);
  }

  @PostMapping("periods")
  public ResponseEntity<Period> postPeriod(@RequestBody Period period) {
    period.setId(periods.size() + 1);
    periods.add(period);

    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(period.getId())
        .toUri();

    return ResponseEntity.created(location).body(period);
  }

}
