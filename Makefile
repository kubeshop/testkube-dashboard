.PHONY: docker-build

docker-build:
	docker build -t testkube-dashboard:latest .
