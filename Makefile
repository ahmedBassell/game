local:
	npm install
	npm install -g bower gulp
	bower install
	gulp tasks --env=${NODE_ENV}
	docker-compose -f docker-compose.local.yml up -d --build
dev:
	docker-compose up -d --build
prod:
	docker-compose -f docker-compose.prod.yml up -d --build
