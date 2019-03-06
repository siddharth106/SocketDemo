package com.stackroute.demo.controller;

import com.stackroute.demo.domain.Code;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1/")
@CrossOrigin("*")
public class WebController {




    @MessageMapping("/hello")
    @SendTo("/topic/hi")
    public Code greeting(Code a) throws Exception {
        System.out.println(a.getCodeTemplate()+"its coming");
        Code e=new Code();
        e.setCodeTemplate("marjaosale");
        return e;
    }
}
