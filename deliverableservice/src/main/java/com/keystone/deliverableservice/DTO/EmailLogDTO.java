package com.keystone.deliverableservice.DTO;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmailLogDTO {
	public String recipientEmail;
	public String subject;
	public String body;

}
