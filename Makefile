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

