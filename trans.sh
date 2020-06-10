#!/bin/bash

name=$1
tar=$2

echo $name
echo $tar

if [ -d ./.git ]; then
  rm -rf ./.git
  mkdir ../${name}
  cp -a ./ ../${name}/
  cd ../${name}
  git init
  git remote add origin ${tar}
  git add -A
  git commit -am "init"
  git push -u origin master
  echo "DONE!"
else
  echo "找不到.git文件"
fi