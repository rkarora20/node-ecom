#!/bin/bash
yum install -y nodejs npm
cd /var/www/html
npm install
npm start &
