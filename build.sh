#!/usr/bin/env bash

PWD=`pwd`
node_modules/electron-packager/cli.js $PWD Netflix --platform=darwin --arch=x64 --out=releases \
  --prune \
  --overwrite \
  --icon=${PWD}/assets/icon.icns \
  --ignore="node_modules/(electron-packager|electron-prebuilt)"
