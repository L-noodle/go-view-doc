.PHONY: dist test
default: help
dev:
	npm run docs:dev

dist:
	npm run docs:build

	
help:
	@echo "    make dev [npm run docs:dev] 开发模式"
	@echo "    make dist [npm run docs:build] 编译模式"