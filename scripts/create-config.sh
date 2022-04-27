#!/bin/sh

if [ "x$ADS_UI_URL" = "x" ]
then
  ADS_UI_URL="http://localhost:9009/ads.js"
fi

if [ "x$AMS_API_URL" = "x" ]
then
  AMS_API_URL="http://localhost:8001"
fi

if [ "x$SRS_API_URL" = "x" ]
then
  SRS_API_URL="http://localhost:8000"
fi

if [ "x$AUTH_ENABLED" = "x" ]
then
  AUTH_ENABLED="false"
fi


echo "Generating config.js"
echo "const ApiDesignerConfig = {
    \"apis\": {
        \"srs\": \"$SRS_API_URL\",
        \"ams\": \"$AMS_API_URL\"
    },
  \"federatedModules\": {
      \"ads\": \"$ADS_UI_URL\"
  },
   \"auth\": {
       \"enabled\": $AUTH_ENABLED
   }
}" > /usr/share/nginx/html/config.js

echo "Generated config.js successfully."
cat /usr/share/nginx/html/config.js

