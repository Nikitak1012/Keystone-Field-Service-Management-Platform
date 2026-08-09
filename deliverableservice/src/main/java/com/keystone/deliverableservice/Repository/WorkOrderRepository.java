package com.keystone.deliverableservice.Repository;

import com.keystone.deliverableservice.Entity.WorkOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {
    // This method allows us to find a job by its Work Order Number (e.g., WO-6011)
    WorkOrder findByWoNumber(String woNumber);
}