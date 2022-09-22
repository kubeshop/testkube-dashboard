.PHONY: docker-build

docker-build:
	docker build  --platform linux/x86_64 -t testkube-dashboard:latest .
