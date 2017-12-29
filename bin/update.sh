#!/usr/bin/env bash

isConnected() {
	ping -q -w 1 -c 1 "$(ip r | grep default | cut -d ' ' -f 3)" > /dev/null && return 0 || return 1
}

path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if isConnected; then
	cd "$path"/.. || exit
	git pull origin master
fi
