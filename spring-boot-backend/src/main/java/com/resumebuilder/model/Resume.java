
package com.resumebuilder.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "resumes")
public class Resume {
    @Id
    private String id;
    private String userId;
    private String name;
    private String createdAt;
    private String updatedAt;
    
    private PersonalInfo personalInfo;
    private List<Experience> experience = new ArrayList<>();
    private List<Education> education = new ArrayList<>();
    private List<Skill> skills = new ArrayList<>();
    
    @Data
    public static class PersonalInfo {
        private String name;
        private String title;
        private String email;
        private String phone;
        private String location;
        private String summary;
    }
    
    @Data
    public static class Experience {
        private String id;
        private String title;
        private String company;
        private String location;
        private String startDate;
        private String endDate;
        private String description;
    }
    
    @Data
    public static class Education {
        private String id;
        private String degree;
        private String school;
        private String location;
        private String startDate;
        private String endDate;
        private String description;
    }
    
    @Data
    public static class Skill {
        private String id;
        private String name;
        private String level;
    }
}
