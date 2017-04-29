local-setup:
	npm install -g bower gulp
	npm install
	bower install
local:
	gulp tasks --env=${NODE_ENV}
	docker-compose -f docker-compose.local.yml up -d --build
	gulp --env=local
dev:
	docker-compose up -d --build
prod:
	docker-compose -f docker-compose.prod.yml up -d --build
