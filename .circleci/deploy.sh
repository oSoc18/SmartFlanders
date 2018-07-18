#!/bin/bash

# Go to master branch version
cd ~/build/SmartFlanders
git reset --hard
rm package-lock.json
git pull
git checkout master

# Install back end
npm install
forever stopall
forever start index.js

# Install front end
cd /var/www/smartflanders.ilabt.imec.be
rm *.html *.css *.js *.scss
cp ~/build/SmartFlanders/frontend /var/www/smartflanders.ilabt.imec.be

