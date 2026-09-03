#!/bin/bash
# Run the Meru Heritage Spring Boot app directly, without needing VS Code's
# Java tooling to be working at all. Use this any time the IDE's "Run"
# button gives you trouble.
#
# Usage:
#   chmod +x run.sh   (only needed once)
#   ./run.sh
set -e
cd "$(dirname "$0")"
echo "Starting Meru Heritage (Spring Boot) — this will download dependencies the first time..."
mvn spring-boot:run
