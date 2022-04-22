#!/bin/sh

echo "var ApiDesignerConfig = {
  \"federatedModules\": {
      \"ads\": \"$ADS_UI_URL\"
  }
}" > /usr/share/nginx/html/config.js
