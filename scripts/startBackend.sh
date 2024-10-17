#!/bin/bash


# echo "starting backend app"
# sudo su -l ec2-user -c 'wget https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem'
# sudo su -l ec2-user -c 'chmod +x rds-combined-ca-bundle.pem'
# npm run ${ENV}
# echo "backend app started"

echo "starting backend app"
echo "running npm run ${ENV}!"
sudo su -l ec2-user -c 'cd backend && npm run ${ENV}'
echo "backend app started"
