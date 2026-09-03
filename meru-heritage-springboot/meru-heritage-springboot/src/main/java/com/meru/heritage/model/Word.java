package com.meru.heritage.model;

/**
 * One dictionary entry. Jackson serializes this to:
 *   { "term": "...", "meaning": "...", "note": "...", "category": "..." }
 * matching exactly what assets/js/api.js on the frontend already expects.
 */
public record Word(String term, String meaning, String note, String category) {
}
