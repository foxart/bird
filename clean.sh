#!/usr/bin/env bash

## CLEAN GIT CACHE
for git_cache in $(git ls-files -i --exclude-standard); do
  echo "$git_cache" && git rm -f --cached "$git_cache"
done
