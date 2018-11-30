#! /bin/sh

cd /home/james/react-protected-routes

git checkout master
git pull

cd public && yarn && yarn build

cd .. &&

rm -rf node_modules && yarn

forever stop rdr

forever start -l react-protected-routes.log -a --uid rpr index.js