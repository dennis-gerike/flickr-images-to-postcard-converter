#!/bin/bash      

# request API token
# requires a valid XRAY_API_CLIENT_ID and XRAY_API_CLIENT_SECRET
TOKEN=`curl -# \
    -X POST 'https://xray.cloud.getxray.app/api/v2/authenticate' \
    -H "Content-Type: application/json" \
    --data '{"client_id": "'"$XRAY_CLIENT_ID"'", "client_secret": "'"$XRAY_CLIENT_SECRET"'"}'`

# strip quotation marks from the response
TOKEN=${TOKEN:1:-1}

# export token as an environment variable
export XRAY_API_TOKEN=$TOKEN

# return token
echo $XRAY_API_TOKEN
