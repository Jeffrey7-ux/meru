# Meru Heritage — Spring Boot Edition (VS Code guide)

This is the same website you already had, but the backend is now a proper
**Spring Boot** application instead of the plain-Java `HttpServer`. The
frontend files (HTML/CSS/JS/Bootstrap) are **completely unchanged** — they
didn't need to be, which is the whole point of this guide: it shows you
exactly *how* a frontend and a Java backend connect, using code you already
have.

```
meru-heritage-springboot/
├── pom.xml                                  ← tells Maven which libraries to download
├── .vscode/
│   ├── extensions.json                      ← recommends the right VS Code extensions
│   └── launch.json                          ← lets you click "Run" straight away
└── src/main/
    ├── java/com/meru/heritage/
    │   ├── MeruHeritageApplication.java      ← starts the whole app
    │   ├── controller/
    │   │   ├── ContentController.java        ← ⭐ THE frontend↔backend connection point
    │   │   └── SiteErrorController.java       (shows our styled 404 page)
    │   ├── model/
    │   │   ├── Section.java                  (history/culture content shape)
    │   │   └── Word.java                     (dictionary entry shape)
    │   └── service/
    │       └── ContentService.java           ← all the bilingual text lives here
    └── resources/
        ├── application.properties            (port number, app name)
        └── static/                           ← 🌐 your exact frontend, unchanged
            ├── index.html
            ├── history.html
            ├── culture.html
            ├── dictionary.html
            ├── 404.html
            └── assets/css/, assets/js/
```

## 1. How the connection actually works (read this first)

Two things make a Spring Boot app automatically serve a whole website AND
an API from one place:

1. **Static files.** Anything you put in `src/main/resources/static/` is
   served as-is at the site's root. So `static/index.html` becomes
   `http://localhost:8080/`, `static/history.html` becomes
   `http://localhost:8080/history.html`, and so on — Spring Boot does this
   automatically, no code required. That's why your existing HTML/CSS/JS
   didn't need to change at all.

2. **REST endpoints.** `ContentController.java` is annotated
   `@RestController`, which tells Spring "serialize whatever these methods
   return straight to JSON." So when your frontend's `assets/js/api.js`
   does:
   ```js
   fetch("/api/history?lang=en")
   ```
   that request is routed by Spring straight into:
   ```java
   @GetMapping("/history")
   public Map<String, Object> historyEndpoint(@RequestParam(defaultValue = "en") String lang) {
       ...
   }
   ```
   Spring reads the `?lang=en` part into the `lang` parameter for you, and
   converts the returned `Map`/`List`/record objects into the exact JSON
   shape (`{"sections": [...]}`) your frontend already expects.

Because both the static files and the API are served from the **same
Spring Boot app on the same port**, the browser sees them as the same
origin — that's why there's no CORS setup anywhere. This is exactly the
same relationship your plain-Java version had; Spring Boot just removes
the boilerplate (manual JSON building, manual static file serving) around
it.

## 2. Install what you need (one-time setup)

1. **A JDK, version 17 or newer.**
   - Check with `java -version` in a terminal.
   - If you don't have one, install [Eclipse Temurin 17](https://adoptium.net/) (or newer).
2. **Apache Maven** (used to download Spring Boot's libraries and build the project).
   - Check with `mvn -version`.
   - If missing: macOS → `brew install maven`; Windows → `choco install maven` or download from [maven.apache.org](https://maven.apache.org/download.cgi); Linux → `sudo apt install maven`.
3. **VS Code**, plus these two extensions (VS Code will actually prompt you to install them automatically when you open this folder, because of `.vscode/extensions.json`):
   - **Extension Pack for Java** (`vscjava.vscode-java-pack`) — Java language support, debugger, project explorer.
   - **Spring Boot Extension Pack** (`vmware.vscode-spring-boot`) — Spring-aware autocomplete, the Spring Boot Dashboard, and `application.properties` support.

## 3. Open and run the project

1. **File → Open Folder…** and select the `meru-heritage-springboot` folder.
2. VS Code will show a notification: *"This workspace has extension recommendations."* Click **Install All**.
3. Wait for the bottom-right corner to finish "Java: Loading Projects…" — the first time, VS Code/Maven downloads Spring Boot's dependencies from Maven Central, so you'll need an internet connection for this step (only).
4. Run it any of these three ways:
   - **Easiest:** open `MeruHeritageApplication.java`. A small **▷ Run** link appears right above `public static void main(...)`. Click it.
   - **Spring Boot Dashboard:** click the leaf icon in the Activity Bar (left sidebar) → find `meru-heritage` under "Local Apps" → click the ▷ play icon next to it.
   - **Terminal:** open a terminal in VS Code (`` Ctrl+` ``) and run:
     ```bash
     mvn spring-boot:run
     ```
5. Watch the terminal/output panel for a line like:
   ```
   Tomcat started on port(s): 8080 (http)
   Started MeruHeritageApplication in 1.9 seconds
   ```
6. Open **http://localhost:8080** in your browser. That's the whole site — Home, History, Culture, Dictionary — now being served by Spring Boot.

To stop it: click the red ■ Stop button in the Debug toolbar, or `Ctrl+C` in the terminal.

## 4. Confirm the frontend↔backend connection yourself

With the app running, open these two URLs directly in your browser:

- `http://localhost:8080/api/history?lang=en` → raw JSON history content
- `http://localhost:8080/api/dictionary?lang=sw` → raw JSON dictionary content, in Kiswahili

If you see JSON, the backend is working. Then open `http://localhost:8080/history.html`
— the same content should appear, nicely formatted, because `assets/js/api.js`
fetched exactly those same URLs and rendered them into the page. That round
trip (browser page → `fetch()` → Spring controller → JSON → JavaScript
renders it) *is* the frontend-backend connection.

## 5. Editing content

All the actual text lives in one place:
`src/main/java/com/meru/heritage/service/ContentService.java`. Edit the
English/Kiswahili strings there, save, stop the app (red ■ button) and
run it again — Spring Boot doesn't hot-reload Java changes by default, so
a restart is expected. (If you want automatic restarts on save, add the
`spring-boot-starter-devtools` dependency to `pom.xml` — ask me if you'd
like that set up.)

To add a dictionary word, add one more line inside `getDictionary(...)`:
```java
words.add(word("Kiswahili term", "English meaning",
        "English note", "Maelezo kwa Kiswahili",
        "Category", "Kategoria", sw));
```

## 6. Where your old plain-Java backend went

Your original dependency-free `MeruServer`/`ContentData`/`Json` classes
still exist in the earlier `meru-heritage` project — they're untouched.
This new `meru-heritage-springboot` project is a separate, parallel
version that does the same job using Spring Boot conventions instead of
hand-written `HttpServer` code. You can keep both, or delete whichever one
you don't need — the frontend files are identical either way.

## 7. Common hiccups

| Symptom | Likely cause / fix |
|---|---|
| VS Code shows red squiggles on `@SpringBootApplication` etc. | The Java extension hasn't finished downloading dependencies yet — wait for "Loading Projects" to finish, or run `mvn clean install` in a terminal once. |
| `mvn: command not found` | Maven isn't installed or isn't on your PATH — see step 2. |
| Port 8080 already in use | Something else is using that port. Change `server.port=8080` in `application.properties` to e.g. `8081`, then open `http://localhost:8081` instead. |
| Page loads but History/Culture/Dictionary show an error banner | The Spring Boot app isn't running, or you opened the HTML file directly from disk (`file://...`) instead of via `http://localhost:8080/...`. Always go through the running server. |
| **"Cannot find a class with the main method"** | This means the Java extension's language server hasn't built a project model for your workspace yet — it isn't a code problem. See section 8 below. |

## 8. "Cannot find a class with the main method" — full fix

VS Code's own docs describe this error as: *"the debugger doesn't find any
main class in the whole workspace."* In plain terms: the Java Language
Server either hasn't finished indexing the project, or never successfully
recognized it as a Maven project in the first place. Work through these in
order:

1. **Skip the IDE and just run it from a terminal** — this always works
   regardless of what VS Code's Java tooling is doing, and confirms the
   code itself is fine:
   ```bash
   ./run.sh        # Mac/Linux
   run.bat         # Windows (double-click it, or run from a terminal)
   ```
   Once you see `Tomcat started on port(s): 8080`, open
   `http://localhost:8080` — you're up and running immediately, no
   debugging required.

2. **Confirm you opened the right folder.** In the Explorer sidebar,
   `pom.xml` must be visible at the very top level. If it isn't, you
   opened the wrong folder — use **File → Open Folder…** and pick
   `meru-heritage-springboot` itself.

3. **Check the Java extension actually loaded the project.** Open
   **View → Output**, then in the dropdown at the top-right of that panel
   pick **"Language Support for Java"**. Look for errors there — that's
   where real import failures show up (e.g. failed dependency downloads).

4. **Force a clean re-index.** Command Palette
   (`Ctrl+Shift+P`/`Cmd+Shift+P`) → **"Java: Clean Java Language Server
   Workspace"** → choose **"Reload and delete"**. Wait for "Loading
   Projects…" in the bottom-right to fully finish before trying Run again.

5. **Restart VS Code entirely.** The doc you're likely looking at
   specifically recommends this for Java debugger session failures — it
   genuinely resolves it a large fraction of the time.

6. **Last resort:** delete VS Code's Java workspace cache folder (path
   depends on OS — search "vscode java clean workspace cache
   [your OS]") and reopen the project fresh.

If the terminal method in step 1 works but the IDE still won't cooperate,
that's conclusive proof the project itself is correct and this is purely
a VS Code environment issue on this machine.
