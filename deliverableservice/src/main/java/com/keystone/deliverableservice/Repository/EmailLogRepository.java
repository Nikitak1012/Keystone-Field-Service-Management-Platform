package com.keystone.deliverableservice.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.deliverableservice.Entity.EmailLog;

@Repository
public interface EmailLogRepository extends JpaRepository<EmailLog,Long> {
	Optional<EmailLog>findByRecipientEmail(String recepientEmail);

}

