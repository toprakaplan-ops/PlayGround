#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"
: "${CAPTURE_URL:?Set CAPTURE_URL to the exact preview URL}"
: "${CAPTURE_DIR:?Set CAPTURE_DIR for screenshot output}"

# The runtime capture helper opens the supplied URL in Chromium, waits for the
# page to render, saves desktop/mobile evidence, and closes its own browser.
/usr/bin/time -p env CAPTURE_STRICT=1 node "${RUNTIME_DIR:?}/scripts/default-capture.mjs"
