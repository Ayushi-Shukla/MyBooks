package com.stackroute.favouriteservice.filter;

import java.io.IOException;

import javax.servlet.*;
import javax.servlet.http.*;

import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtFilter extends GenericFilterBean {
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain)throws IOException,ServletException{
		HttpServletRequest request =(HttpServletRequest) req;
		HttpServletResponse response =(HttpServletResponse) res;
		String authHeader=request.getHeader("authorization");
		if ("OPTIONS".equals(request.getMethod())){
			response.setStatus(HttpServletResponse.SC_OK);
			chain.doFilter(req, res);
		} else {
			if (authHeader==null|| !authHeader.startsWith("Bearer ")){
				throw new ServletException("Missing or invalid authorization");
			}
			String token=authHeader.substring(7);
			Claims claims=Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody();
			request.setAttribute("claims", claims);
			chain.doFilter(req, res);
		}
	}
}
