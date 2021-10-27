#! /bin/sh

echo "" > /app/.env 

if [ $1 = "-a" ] || [ $1 = "--api" ] ; then
    echo "REACT_APP_API_SERVER_ENDPOINT=$2" > /app/.env 
    
fi
nginx -g 'daemon off;'