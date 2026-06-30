root_dir = $(realpath ..)

run:
	sleep 2
	echo "set \$$root_path '${root_dir}';" >| $$PWD/path.conf
	echo "nginx running on http://localhost:3080/"
	nginx -c $$PWD/nginx.conf -p $$PWD
