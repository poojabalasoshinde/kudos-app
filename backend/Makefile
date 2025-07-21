up:
	docker-compose up --build

migrate:
	docker-compose exec backend python manage.py migrate

seed:
	docker-compose exec backend python manage.py seed_demo_data

down:
	docker-compose down

test:
	docker-compose exec backend python manage.py test
