default: build

setup:
	@brew bundle --no-upgrade
	@corepack yarn

dev: clean
	@corepack yarn dev

build: clean
	@corepack yarn build

clean:
	@rm -rf .build
