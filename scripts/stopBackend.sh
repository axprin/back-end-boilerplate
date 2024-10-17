#!/bin/bash

sudo su -l ec2-user -c 'cd backend && npm run stop'
sudo su -l ec2-user -c 'sudo rm -rf backend/*'
