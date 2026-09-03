package com.meru.heritage.model;

import java.util.List;

/**
 * One block of History/Culture content: a heading plus its paragraphs.
 *
 * Because this is a Java "record", Spring's built-in JSON library
 * (Jackson) automatically turns it into:
 *   { "title": "...", "paragraphs": ["...", "..."] }
 * with zero extra configuration — no manual JSON-building needed, unlike
 * the plain-Java version of this backend.
 */
public record Section(String title, List<String> paragraphs) {
}
