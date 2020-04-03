#!/usr/bin/env bash

echo "Creating nonce file at $NONCE_FILE"

NONCE=$(node -e console.log\(crypto.randomBytes\(18\).toString\(\"base64\"\)\))

echo $NONCE > $NONCE_FILE
