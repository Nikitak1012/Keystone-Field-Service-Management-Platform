package com.keystone.deliverableservice.DTO;

import com.keystone.deliverableservice.ENUM.Role;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequestDTO {
	
	public String userName;
	
	public String userEmail;
	public String password;
	public String phone;
	public Role role;




	

}
