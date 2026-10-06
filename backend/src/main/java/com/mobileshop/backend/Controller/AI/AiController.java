package com.mobileshop.backend.Controller.AI;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController 
@RequestMapping ("/api/ai")
public class AiController {
    
    @PostMapping("text")
    public void AiController(@RequestBody String prompt){
        System.out.println(prompt);  

    }
}
