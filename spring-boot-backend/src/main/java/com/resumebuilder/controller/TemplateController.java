
package com.resumebuilder.controller;

import com.resumebuilder.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/templates")
public class TemplateController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllTemplates() {
        // In a real implementation, these would come from a database
        List<Map<String, Object>> templates = List.of(
            createTemplate("modern", "Modern", "A clean, contemporary design with a professional look"),
            createTemplate("professional", "Professional", "Traditional layout perfect for corporate environments"),
            createTemplate("creative", "Creative", "Unique design for creative industries"),
            createTemplate("minimal", "Minimal", "Simple, elegant design with focus on content"),
            createTemplate("executive", "Executive", "Sophisticated design for senior positions")
        );
        
        Map<String, Object> response = new HashMap<>();
        response.put("templates", templates);
        response.put("total", templates.size());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getTemplateById(@PathVariable String id) {
        // In a real implementation, this would fetch from a database
        if (List.of("modern", "professional", "creative", "minimal", "executive").contains(id)) {
            String name = id.substring(0, 1).toUpperCase() + id.substring(1);
            String description = "Template description for " + name;
            
            return ResponseEntity.ok(createTemplate(id, name, description));
        } else {
            return ResponseEntity.status(404)
                    .body(new MessageResponse("Template not found"));
        }
    }
    
    private Map<String, Object> createTemplate(String id, String name, String description) {
        Map<String, Object> template = new HashMap<>();
        template.put("id", id);
        template.put("name", name);
        template.put("description", description);
        return template;
    }
}
