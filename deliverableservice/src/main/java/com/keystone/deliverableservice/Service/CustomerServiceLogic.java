package com.keystone.deliverableservice.Service;

import java.util.List;

import com.keystone.deliverableservice.Entity.Customer;

public interface CustomerServiceLogic {
	Customer createCustomer(Customer customer);
	
	Customer updateCustomer(Long id, Customer customer);
	
	Customer getCustomer(Long id);
	List<Customer> getAllCustomer();
	
	void deleteCustomer(String email);
}
