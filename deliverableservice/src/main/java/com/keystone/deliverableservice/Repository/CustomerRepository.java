package com.keystone.deliverableservice.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.deliverableservice.Entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer , Long>{
	Optional<Customer>findByEmail(String email);
	boolean existsEmail(String email);

}
