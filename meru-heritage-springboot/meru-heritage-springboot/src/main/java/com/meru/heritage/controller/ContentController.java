package com.meru.heritage.controller;

import com.meru.heritage.model.Section;
import com.meru.heritage.model.Word;
import com.meru.heritage.service.ContentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * This class IS the connection point between the frontend and the backend.
 *
 * assets/js/api.js on the frontend calls, e.g.:
 *     fetch("/api/history?lang=en")
 * and that request lands right here, in historyEndpoint() below.
 *
 * @RestController tells Spring: "every method's return value should be
 * serialized straight to JSON and written to the HTTP response" — that's
 * why we can just return a List<Section> or a Map and never touch JSON
 * text ourselves; Jackson (bundled with spring-boot-starter-web) handles
 * the conversion automatically.
 *
 * Because the frontend files (index.html, etc.) are ALSO served by this
 * same Spring Boot app — from src/main/resources/static — the browser
 * calls "/api/history" as a same-origin request. No CORS configuration
 * is needed, exactly like the plain-Java version of this backend.
 */
@RestController
@RequestMapping("/api")
public class ContentController {

    private final ContentService contentService;

    // Spring sees ContentController needs a ContentService and automatically
    // creates and hands it one — this is "constructor dependency injection".
    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/history")
    public Map<String, Object> historyEndpoint(@RequestParam(defaultValue = "en") String lang) {
        List<Section> sections = contentService.getHistory(normalize(lang));
        return Map.of("sections", sections);
    }

    @GetMapping("/culture")
    public Map<String, Object> cultureEndpoint(@RequestParam(defaultValue = "en") String lang) {
        List<Section> sections = contentService.getCulture(normalize(lang));
        return Map.of("sections", sections);
    }

    @GetMapping("/dictionary")
    public Map<String, Object> dictionaryEndpoint(@RequestParam(defaultValue = "en") String lang) {
        List<Word> words = contentService.getDictionary(normalize(lang));
        return Map.of("words", words);
    }

    /** Only "en" and "sw" are supported; anything else quietly falls back to English. */
    private String normalize(String lang) {
        return "sw".equalsIgnoreCase(lang) ? "sw" : "en";
    }
}
