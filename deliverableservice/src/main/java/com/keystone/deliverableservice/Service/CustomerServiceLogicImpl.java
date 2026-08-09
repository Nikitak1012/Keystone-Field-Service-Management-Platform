package com.keystone.deliverableservice.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keystone.deliverableservice.Entity.Customer;
import com.keystone.deliverableservice.Repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor


public abstract class CustomerServiceLogicImpl implements CustomerServiceLogic{
	
	@Autowired
	private CustomerRepository cusRepo;
	
	@Override
	public Customer createCustomer(Customer customer) {
		if(cusRepo.existsEmail(customer.getEmail())) {
			throw new RuntimeException("Customer already exists");
		}
		customer.setActive(true);
		customer.setCreatedAt(LocalDateTime.now());
		
		return cusRepo.save(customer);
	}
	
	@Override
	public Customer updateCustomer(Long id, Customer customer) {
		Customer existingCustomer = cusRepo.findById(id).orElseThrow(() -> new RuntimeException("Customer not Found"));
		
		existingCustomer.setCompanyName(customer.getCompanyName());
		existingCustomer.setContactPerson(customer.getContactPerson());
		existingCustomer.setEmail(customer.getEmail());
		existingCustomer.setPhone(customer.getPhone());
		existingCustomer.setAddress(customer.getAddress());
		existingCustomer.setActive(customer.isActive());
		
		return cusRepo.save(existingCustomer);
		
		
	}
	
	@Override
	public Customer getCustomer(Long id) {
		return cusRepo.findById(id).orElseThrow(() -> new RuntimeException("Customer not Found"));
	}
	
	@Override
	public List<Customer>getAllCustomer(){
		return cusRepo.findAll();
	}
	
	@Override
	public void deleteCustomer(String email) {
		Customer custom = cusRepo.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not Found"));
		
		cusRepo.delete(custom);
	}

}
