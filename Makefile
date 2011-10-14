lessc:
	./node_modules/.bin/restartr -c ./node_modules/.bin/lessc -a less/bootstrap.less -a public/app.css less/*

server:
	NODE_ENV=production ./node_modules/.bin/restartr -c node -a server.js server.js templates/* templates/*/* public/app.css controllers/* live_renders/* lib/*

redis:
	redis-server evalsha-redis.conf
