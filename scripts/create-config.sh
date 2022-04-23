#!/bin/sh

if [ "x$ADS_UI_URL" = "x" ]
then
  ADS_UI_URL="http://localhost:9009/ads.js"
fi

echo "Generating config.js"
echo "const ApiDesignerConfig = {
  \"federatedModules\": {
      \"ads\": \"$ADS_UI_URL\"
  }
}" > /usr/share/nginx/html/config.js

echo "Generated config.js successfully."
cat /usr/share/nginx/html/config.js

