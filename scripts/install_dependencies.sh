#!/bin/bash
yum install -y nodejs npm
cd /home/ec2-user/node-ecom
npm install
nohup npm start > app.log 2>&1 &

