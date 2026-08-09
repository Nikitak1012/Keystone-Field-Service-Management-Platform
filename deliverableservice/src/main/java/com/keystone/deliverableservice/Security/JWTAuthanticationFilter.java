package com.keystone.deliverableservice.Security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthanticationFilter extends OncePerRequestFilter {
	@Autowired
	private JWTUtil jwtUtil;
	
//	private final JWTUtil jwtUtil;
//	public JWTAuthanticationFilter(JWTUtil jwtUtil) {
//		this.jwtUtil = jwtUtil;
//	}
	@Autowired
	private CustomUserDetailsService customUserDetails;
	
	@Autowired
	private TokenKillingService tokenkill;
	

	
	public void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException,IOException{

String header= request.getHeader("Authorization");

String token= null;



if(StringUtils.hasText(header) && header.startsWith("Bearer ")) {
token= header.substring(7);
}



if(token != null && jwtUtil.validateToken(token)) {

String userEmail= jwtUtil.getUserEmail(token);

UserDetails userDetails= customUserDetails.loadUserByUserEmail(userEmail);

UsernamePasswordAuthenticationToken authentication = 
  new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
SecurityContextHolder.getContext().setAuthentication(authentication);
}

String token1 = jwtUtil.extractToken(header);

if(token!=null) {
if(tokenkill.isblockToken(token1)) {
response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
response.getWriter().write("Token got expire");
return;
}
}





filterChain.doFilter(request, response);

	

}
}
