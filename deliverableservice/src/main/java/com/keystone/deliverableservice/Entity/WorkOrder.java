package com.keystone.deliverableservice.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "work_orders")
public class WorkOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "wo_number", unique = true, nullable = false)
    private String woNumber;

    @Column(name = "title")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "status")
    private String status; // ASSIGNED, IN_PROGRESS, COMPLETED, ON_HOLD

    @Column(name = "priority")
    private String priority;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // --- NEW COLUMNS FOR PROJECT SUBMISSION ---
    @Column(name = "source_code_link")
    private String sourceCodeLink;

    @Column(name = "live_deployment_link")
    private String liveDeploymentLink;

    @Column(name = "demo_video_link")
    private String demoVideoLink;

    @Column(name = "feedback_video_link")
    private String feedbackVideoLink;

    @Column(name = "report_file_path")
    private String reportFilePath;

    // --- CONSTRUCTORS ---
    public WorkOrder() {}

    // --- GETTERS AND SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getWoNumber() { return woNumber; }
    public void setWoNumber(String woNumber) { this.woNumber = woNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Getters and Setters for the new Submission fields
    public String getSourceCodeLink() { return sourceCodeLink; }
    public void setSourceCodeLink(String sourceCodeLink) { this.sourceCodeLink = sourceCodeLink; }

    public String getLiveDeploymentLink() { return liveDeploymentLink; }
    public void setLiveDeploymentLink(String liveDeploymentLink) { this.liveDeploymentLink = liveDeploymentLink; }

    public String getDemoVideoLink() { return demoVideoLink; }
    public void setDemoVideoLink(String demoVideoLink) { this.demoVideoLink = demoVideoLink; }

    public String getFeedbackVideoLink() { return feedbackVideoLink; }
    public void setFeedbackVideoLink(String feedbackVideoLink) { this.feedbackVideoLink = feedbackVideoLink; }

    public String getReportFilePath() { return reportFilePath; }
    public void setReportFilePath(String reportFilePath) { this.reportFilePath = reportFilePath; }
}