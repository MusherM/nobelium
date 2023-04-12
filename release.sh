#!/bin/bash
date +s% > trigger

git add .
git commit -m 'update blog'
git push origin master
