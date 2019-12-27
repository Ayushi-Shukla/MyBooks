package com.stackroute.userservice.controllerTest;

import java.util.*;

import org.junit.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.mockito.*;
import static org.mockito.Mockito.*;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.UserServiceApplication;
import com.stackroute.userservice.controller.UserController;
import com.stackroute.userservice.domain.User;
import com.stackroute.userservice.service.SecurityTokenGenerator;
import com.stackroute.userservice.service.UserService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ContextConfiguration(classes=UserServiceApplication.class)
@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {
	
	@Autowired
	private MockMvc mockMVC;
	@MockBean
	private UserService userService;
	@MockBean
	private SecurityTokenGenerator securityTokenGenerator;
	@InjectMocks
	private UserController userController;
	private User user;
	
	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		user=new User("JohnSnow","John","Snow","John123",new Date());
	}
	
	@Test
	public void testRegisterUser()throws Exception{
		when(userService.saveUser(user)).thenReturn(true);
		mockMVC.perform(post("/api/userservice/register").contentType(MediaType.APPLICATION_JSON).content(jsonToString(user))).andExpect(status().isCreated());
		verify(userService,times(1)).saveUser(Mockito.any(User.class));
		verifyNoMoreInteractions(userService);
	}
	
	@Test
	public void testLoginUser()throws Exception{
		String userId="JohnSnow";
		String password="John123";
		when(userService.saveUser(user)).thenReturn(true);
		when(userService.findByUserIdAndPassword(userId, password)).thenReturn(user);
		mockMVC.perform(post("/api/userservice/login").contentType(MediaType.APPLICATION_JSON).content(jsonToString(user))).andExpect(status().isOk());
		verify(userService,times(1)).findByUserIdAndPassword(user.getUserId(), user.getPassword());
		verifyNoMoreInteractions(userService);
	}
	
	private String jsonToString(final Object object) {
		String result;
		try {
			final ObjectMapper mapper = new ObjectMapper();
			result = mapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			result = "Json processing error";
		}
		return result;
	}
}
