package com.abutua.backend.model;

public class Student {
    private int id;
    private String name;
    private String email;
    private String phone;
    private int idCourse;
    private int period;

    public Student(int id, String name, String email, String phone, int idCourse, int period) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.idCourse = idCourse;
        this.period = period;
    }

    public Student() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getIdCourse() {
        return idCourse;
    }

    public void setIdCourse(int idCourse) {
        this.idCourse = idCourse;
    }

    public int getPeriod() {
        return period;
    }

    public void setPeriod(int period) {
        this.period = period;
    }
}
