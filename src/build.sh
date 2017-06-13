#!/usr/bin/env bash

mkdir ./uploads

yarn

if [ "$NODE_ENV" = "production" ]
then
    yarn startProd
else
    yarn startDev
fi