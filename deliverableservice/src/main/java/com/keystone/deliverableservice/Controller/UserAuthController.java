package com.keystone.deliverableservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.deliverableservice.DTO.AuthResponseDTO;
import com.keystone.deliverableservice.DTO.ForgotPasswordDTO;
import com.keystone.deliverableservice.DTO.LoginRequest;
import com.keystone.deliverableservice.DTO.RegisterRequestDTO;
import com.keystone.deliverableservice.DTO.ResetPasswordDTO;
import com.keystone.deliverableservice.Service.UserAuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user_auth")
@RequiredArgsConstructor
public class UserAuthController {
	
	@Autowired
	private UserAuthService userAuthService;
	
	
	
	@PostMapping("/register")
	public ResponseEntity<AuthResponseDTO>register(@RequestBody RegisterRequestDTO register){
		return ResponseEntity.ok(userAuthService.register(register));
	}
	
	@PostMapping("/login")
	public ResponseEntity<String>login(@RequestBody LoginRequest login){
		userAuthService.login(login);
		return ResponseEntity.ok("Login Successfully");
	}
	@PostMapping("/forgot_password")
	   public ResponseEntity<String>forgotPassword(@RequestBody ForgotPasswordDTO forgotPassword ){
		userAuthService.forgotPassword(forgotPassword);
		   return ResponseEntity.ok("Reset password link sent over on yur email");
	   }
	   
	   @PostMapping("/reset_password")
	   public ResponseEntity<String>resetPassword(@RequestBody ResetPasswordDTO resetPassword){
		   userAuthService.resetPassword(resetPassword) ;
		   return ResponseEntity.ok("Password Reset successfully");
	   }
	   
	   @PostMapping("/loggedOut")
	   public ResponseEntity<String>loggedOut(HttpServletRequest request){
		   return ResponseEntity.ok(userAuthService.logout(request));
	   }
	

}

