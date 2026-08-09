package com.keystone.deliverableservice.Security;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

@Component
public class TokenKillingService {
	
	private final Set<String>blockToken= ConcurrentHashMap.newKeySet();
	
	public void blockTokenProcess(String token) {
		blockToken.add(token);
	}
	
	public boolean isblockToken(String token) {
		return blockToken.contains(token);
	}

}

