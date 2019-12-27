package com.stackroute.userservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.userservice.domain.User;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotFoundException;
import com.stackroute.userservice.repository.UserRepository;




@Service
public class UserService implements UserServiceInterface {
	
	@Autowired
	private UserRepository userrepository;
	

	@Override
	public boolean saveUser(User user) throws UserAlreadyExistsException {
		Optional<User> obj=userrepository.findById(user.getUserId());
		if(obj.isPresent()){
		throw new UserAlreadyExistsException("User aready exists, cannot be saved");
		}
		userrepository.save(user);
		return true;
	}
	
	@Override
	public User findByUserIdAndPassword(String userId, String password)throws UserNotFoundException{
		User user=userrepository.findByUserIdAndPassword(userId, password);
		if(user==null){
			throw new UserNotFoundException("UserId and Password mismatch");
		}
		return user;
	}
}
