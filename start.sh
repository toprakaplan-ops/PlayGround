#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"
PORT="${PORT:-3000}"
[[ "$PORT" =~ ^[0-9]+$ ]] || { echo "PORT must be numeric: $PORT" >&2; exit 1; }

run_timed() {
  /usr/bin/time -p "$@"
}

# npm install reconciles package.json and package-lock.json before installing.
run_timed npm install --no-audit --no-fund
run_timed npm run build

# Publish the generated static directory for the deployment controller.
DEPLOYMENT_FILE="/home/runner/work/_temp/omgithub-web/deployment-output.json"
run_timed mkdir -p "$(dirname "$DEPLOYMENT_FILE")"
run_timed node --input-type=module -e '
  import { writeFileSync } from "node:fs";
  import { resolve } from "node:path";
  const project = process.cwd();
  writeFileSync(process.argv[1], JSON.stringify({ project, directory: resolve(project, "dist") }));
' "$DEPLOYMENT_FILE"

# Keep the preview server in the foreground so the controller can monitor it.
run_timed ./node_modules/.bin/vite preview --host 0.0.0.0 --port "$PORT" --strictPort
