@echo off
REM Run the Meru Heritage Spring Boot app directly, without needing VS Code's
REM Java tooling to be working at all. Use this any time the IDE's "Run"
REM button gives you trouble.
REM
REM Usage: double-click this file, or run "run.bat" from a terminal.
cd /d "%~dp0"
echo Starting Meru Heritage (Spring Boot) - this will download dependencies the first time...
mvn spring-boot:run
