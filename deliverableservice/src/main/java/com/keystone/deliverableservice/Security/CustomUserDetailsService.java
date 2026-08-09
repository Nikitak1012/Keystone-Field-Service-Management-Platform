package com.keystone.deliverableservice.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.keystone.deliverableservice.Entity.UserAuth;
import com.keystone.deliverableservice.Repository.UserAuthRepository;


@Service
public class CustomUserDetailsService {
	
	@Autowired
	private UserAuthRepository userRepo;


	public UserDetails loadUserByUserEmail(String userEmail) {
		
		UserAuth user= userRepo.findByUserEmail(userEmail)
				     .orElseThrow(()->new RuntimeException("User not found"));
		
		return new org.springframework.security.core.userdetails.User(user.getUserEmail()
				                                                      ,user.getPassword()
				                                                      ,null);


}
}
