#!/bin/bash
set -eo pipefail

if [ -z "$1" ]; then
  echo "Usage: ./once.sh <task-packet-file>"
  exit 1
fi

commits=$(git log -n 5 --format="%H%n%ad%n%B---" --date=short 2>/dev/null || echo "No commits found")
prompt=$(cat "$(dirname "$0")/prompt.md")

claude --permission-mode acceptEdits \
  "Previous commits: $commits Task packet: $(cat "$1") $prompt"
