#!/usr/bin/env bash

curl -X POST 'https://api.twilio.com/2010-04-01/Accounts/AC9edc31711d8fd5db3a03bfe201594c57/SMS/Messages.xml' \
-d 'From=%2B16502906379' \
-d 'To=2672587256' \
-d "Body=new+dxdt+signup%21%20$1" \
-u AC9edc31711d8fd5db3a03bfe201594c57:17474074d9838154328b522cfc529f5c


