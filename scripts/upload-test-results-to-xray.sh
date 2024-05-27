#!/bin/bash

SCRIPTS_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# The upload only works when the credentials for Xray API have been provided.
if [ -z "${XRAY_CLIENT_ID}" ]; then
    echo "Xray client id not found. Environment variable XRAY_CLIENT_ID missing!"
    exit 1
fi
if [ -z "${XRAY_CLIENT_SECRET}" ]; then
    echo "Xray client secret not found. Environment variable XRAY_CLIENT_SECRET missing!"
    exit 1
fi

# With those credentials we can request a temporary API token.
XRAY_API_TOKEN=`"${SCRIPTS_DIR}"/obtain-xray-api-token.sh`

# The upload will consist of two files - one with the results and one with the meta information.
npx ts-node "${SCRIPTS_DIR}"/create-meta-file.ts
metaInfoFile="${SCRIPTS_DIR}"/../test-reports/meta-info.json
resultFile="${SCRIPTS_DIR}"/../test-reports/cucumber-report.json

# Starting the upload.
echo "Uploading"
echo "$resultFile"
echo "together with"
echo "$metaInfoFile"
RESPONSE=`curl -# --fail-with-body --retry 3 \
    -X POST 'https://xray.cloud.getxray.app/api/v2/import/execution/cucumber/multipart' \
    -H "Authorization: Bearer $XRAY_API_TOKEN" \
    -H "Content-Type: multipart/form-data" \
    -F results="@${resultFile}" \
    -F info="@${metaInfoFile}"`

# Error handling.
if [ 0 -eq $? ]; then
  JIRA_ISSUE_KEY=`node "${SCRIPTS_DIR}"/extract-jira-issue-key.ts $RESPONSE`
  echo "Test results uploaded to https://dennis-gerike.atlassian.net/browse/$JIRA_ISSUE_KEY"
else
  echo "Upload failed!"
  echo $RESPONSE
fi;
