#!/usr/bin/env bash

NONCE_FILE=`dirname $0`/../.nonce

if test -f "$NONCE_FILE"; then
    echo "nonce file exist"
    exit 0
fi

echo "Creating nonce file at $NONCE_FILE"

NONCE=$(node -e console.log\(crypto.randomBytes\(18\).toString\(\"base64\"\)\))

echo $NONCE > $NONCE_FILE
