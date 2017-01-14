dev:
	gulp tasks --env=$NODE_ENV
	docker-compose up -d --build
prod:
	gulp tasks --env=$NODE_ENV
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
