# you can use pass the tag like this. make build tag=redis
tag = latest

build:
	docker build -t debtcollective/dispute-tools:$(tag) .

push:
	docker push debtcollective/dispute-tools:$(tag)

build-test:
	mkdir -p ./tmp && cp Dockerfile.test tmp/Dockerfile
	cd tmp; docker build -t debtcollective/dispute-tools-test:$(tag) .
	rm -R tmp

push-test:
	docker push debtcollective/dispute-tools-test:$(tag)
