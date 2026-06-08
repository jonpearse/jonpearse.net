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

# 0x20-FF: Basic Latin + Latin-1 supplement
# 0x174–177: W- and Y-caron
# 0x2000–201D, 2026: various punctuation
fonts:
	@cd assets/fonts && for f in *.*; do rm "$$f"; done
	@cd assets/fonts/source \
	&& npx glyphhanger --subset=*.ttf --formats=woff2 --whitelist=U+20-FF,U+174-177,U+2000-201D,U+2026 \
	&& for f in *-subset.*; do mv "$$f" "../$${f/-subset/}"; done
	@cd assets/fonts && rename -f 'y/A-Z/a-z/' *

# ----------
# DEPLOYMENT
# ----------
# deploy target is configured in the .env, so we need to pull that in
-include .env

RSYNC_FLAGS = -avz --delete

dry-run: build
	@rsync $(RSYNC_FLAGS) --dry-run .build/ $(DEPLOY_HOST):$(DEPLOY_PATH)/

deploy: build
	@rsync $(RSYNC_FLAGS) .build/ $(DEPLOY_HOST):$(DEPLOY_PATH)/
	@ssh $(DEPLOY_HOST) 'sudo service nginx restart'
