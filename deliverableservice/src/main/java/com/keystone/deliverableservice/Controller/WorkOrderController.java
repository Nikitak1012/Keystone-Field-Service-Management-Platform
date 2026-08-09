package com.keystone.deliverableservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "http://localhost:5173") // THIS IS CRITICAL to connect to your React App
@RestController
@RequestMapping("/api/work-orders")
public class WorkOrderController {

    // 1. We will connect this to your database Service later. 
    // @Autowired
    // private WorkOrderService workOrderService;

    // 2. This is the endpoint your React App will call
    @PostMapping("/submit-project")
    public ResponseEntity<String> submitProject(
            @RequestParam("woNumber") String woNumber,
            @RequestParam("sourceCodeLink") String sourceCodeLink,
            @RequestParam("liveDeploymentLink") String liveDeploymentLink,
            @RequestParam("demoVideoLink") String demoVideoLink,
            @RequestParam("feedbackVideoLink") String feedbackVideoLink,
            @RequestParam("reportFile") MultipartFile reportFile
    ) {
        try {
            // STEP A: Save the uploaded PDF/Doc file to a local folder
            String uploadDir = "uploads/projects/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            // Create a unique file name so it doesn't overwrite existing files
            String fileName = System.currentTimeMillis() + "_" + reportFile.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(reportFile.getInputStream(), filePath);

            // STEP B: In the future, you will save these strings to your Database here
            // For example: workOrderService.saveSubmission(woNumber, sourceCodeLink, ..., fileName);
            System.out.println("Submission received for WO: " + woNumber);
            System.out.println("File saved at: " + filePath.toString());

            return ResponseEntity.ok("Project submitted successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }
}