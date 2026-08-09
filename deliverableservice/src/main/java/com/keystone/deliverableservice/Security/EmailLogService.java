package com.keystone.deliverableservice.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.keystone.deliverableservice.DTO.EmailLogDTO;
import com.keystone.deliverableservice.Entity.EmailLog;
import com.keystone.deliverableservice.Repository.EmailLogRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailLogService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private EmailLogRepository emailLogRepo;
	
	
	public void sendResetPasswordMail(String to,String token) {
		
		String resetPasswordLink=
				 "http://localhost:7373/user_auth/reset-password?token="+token;
		
		SimpleMailMessage message= new SimpleMailMessage();
		
		message.setTo(to);
		message.setSubject("Reset Your Password");
		message.setText("Click the bellow link to reset your password:\n"+resetPasswordLink);
		
		javaMailSender.send(message);
		
	}
	
	public String notification(EmailLogDTO email) {
		
		boolean sentStatus=false;
		
		try {
			MimeMessage message= javaMailSender.createMimeMessage();
			
			MimeMessageHelper helper= new MimeMessageHelper(message,true);
			
			helper.setTo(email.recipientEmail);
			helper.setSubject(email.subject);
			helper.setText(email.body);
			
			javaMailSender.send(message);
			
			sentStatus=true;
			
			
		} catch (MessagingException e) {
			sentStatus=false;
		}
		
		EmailLog emailLog= new EmailLog(email.recipientEmail,
				                        email.subject,
				                        email.body,sentStatus);
		
		
		emailLogRepo.save(emailLog);
		
		
		return sentStatus ? "Email sent successfully":"Email sending failed";
	}
	

}

