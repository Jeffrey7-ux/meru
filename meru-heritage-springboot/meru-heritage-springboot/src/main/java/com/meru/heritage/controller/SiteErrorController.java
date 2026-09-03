package com.meru.heritage.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * By default, Spring Boot shows its own generic "Whitelabel Error Page"
 * for missing pages. This tiny controller replaces that with our own
 * static/404.html instead, so a mistyped URL still matches the site's
 * design.
 */
@Controller
public class SiteErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError() {
        return "forward:/404.html";
    }
}
