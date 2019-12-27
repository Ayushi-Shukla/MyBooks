package com.stackroute.userservice.service;

import java.util.*;

import com.stackroute.userservice.domain.*;
import com.stackroute.userservice.exception.*;

public interface UserServiceInterface {
	
	boolean saveUser(User user) throws UserAlreadyExistsException;
	public User findByUserIdAndPassword(String userId,String password)throws UserNotFoundException;

}
