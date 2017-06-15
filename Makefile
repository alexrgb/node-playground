ud:
	docker-compose up

up:
	docker-compose up -d

b:
	docker-compose build

d:
	docker-compose down

e:
	docker-compose exec $(s) $(c)

bash:
	make e s=$(s) c=bash

c:
	sudo rm -rf db && \
	sudo rm -rf src/dist && \
	sudo rm -rf src/uploads && \
	sudo rm -rf src/node_modules