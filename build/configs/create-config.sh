#!/bin/sh

if [ "x$ADS_UI_URL" = "x" ]
then
  ADS_UI_URL="http://localhost:9009/ads.js"
fi

if [ "x$SRS_API_URL" = "x" ]
then
  SRS_API_URL="http://localhost:8000"
fi

if [ "x$AUTH_ENABLED" = "x" ]
then
  AUTH_ENABLED="false"
fi

if [ "x$EDITORS_URL" = "x" ]
then
  EDITORS_URL="http://localhost:9011"
fi


echo "Generating config.js"
echo "const ApiDesignerConfig = {
    \"apis\": {
        \"srs\": \"$SRS_API_URL\"
    },
  \"federatedModules\": {
      \"ads\": \"$ADS_UI_URL\",
      \"editors\": \"$EDITORS_URL\"
  },
   \"auth\": {
       \"enabled\": $AUTH_ENABLED
   }
}" > /opt/app-root/src/config.js

echo "Generated config.js successfully."
cat /opt/app-root/src/config.js

