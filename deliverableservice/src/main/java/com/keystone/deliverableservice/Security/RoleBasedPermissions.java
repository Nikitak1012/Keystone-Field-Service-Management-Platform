package com.keystone.deliverableservice.Security;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.keystone.deliverableservice.ENUM.Permissions;
import com.keystone.deliverableservice.ENUM.Role;

public class RoleBasedPermissions {
	
	public static Map<Role,Set<Permissions>>getRoleBasedPermissions(){
		Map<Role,Set<Permissions>>permission = new HashMap<>();
		
		//for manager
		permission.put(Role.MANAGER, new HashSet<>(Arrays.asList(Permissions.CREATE_USER,
																Permissions.UPDATE_USER,
																Permissions.VIEW_USER,
																Permissions.DELETE_USER,
																
																Permissions.CREATE_CUSTOMER,
																Permissions.UPDATE_CUSTOMER,
																Permissions.VIEW_CUSTOMER,
																Permissions.DELETE_CUSTOMER,
																
																Permissions.CREATE_SITE,
																Permissions.UPDATE_SITE,
																Permissions.VIEW_SITE,
																Permissions.DELETE_SITE,
																
																Permissions.CREATE_WORK_ORDER,
																Permissions.UPDATE_WORK_ORDER,
																Permissions.DELETE_WORK_ORDER,
																Permissions.VIEW_WORK_ORDER,
																Permissions.ASSIGN_WORK_ORDER,
																Permissions.CLOSE_WORK_ORDER,
																Permissions.CANCEL_WORK_ORDER,
																
																Permissions.ADD_PARTS,
																Permissions.UPDATE_PARTS,
																Permissions.DELETE_PARTS,
																Permissions.VIEW_PARTS,
																Permissions.USE_PARTS,
																
																Permissions.ADD_TIME_LOGS,
																Permissions.VIEW_TIME_LOGS,
																
				
																Permissions.VIEW_DASHBOARD,
																Permissions.VIEW_REPORTS,
																
																Permissions.SEND_NOTIFICATION)));
		
		//for Dispatcher
		permission.put(Role.DISPATCHER, new HashSet<>(Arrays.asList(Permissions.CREATE_CUSTOMER,
																	Permissions.UPDATE_CUSTOMER,
																	Permissions.VIEW_CUSTOMER,
																	
																	Permissions.CREATE_SITE,
																	Permissions.UPDATE_SITE,
																	Permissions.VIEW_SITE,
																	
																	Permissions.CANCEL_WORK_ORDER,
																	Permissions.UPDATE_WORK_ORDER,
																	Permissions.VIEW_WORK_ORDER,
																	Permissions.ASSIGN_WORK_ORDER,
																	Permissions.CANCEL_WORK_ORDER,
																	
																	Permissions.VIEW_DASHBOARD)));
		//for Technician
		permission.put(Role.TECHNICIAN, new HashSet<>(Arrays.asList(Permissions.VIEW_WORK_ORDER,
																	Permissions.START_WORK,
																	Permissions.HOLD_WORK,
																	Permissions.RESUME_WORK,
																	Permissions.COMPLETE_WORK,
																	Permissions.USE_PARTS,
																	Permissions.VIEW_PARTS,
																	Permissions.ADD_TIME_LOGS,
																	Permissions.VIEW_TIME_LOGS)));
		//for Customer
		permission.put(Role.CUSTOMER, new HashSet<>(Arrays.asList(Permissions.RAISE_REQUEST,
																Permissions.VIEW_REQUEST)));
		
		return permission;
	}
}
