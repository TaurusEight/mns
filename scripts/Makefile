


%.html : %.slim ; slimrb $^ > $@
%.app : %.go ; gccgo -o $@ $^
%.js : %.es6 ; cp $^ $@

targets := sample.app sample.html sample.js

all:	$(targets) ; @echo Build Complete

.PHONY: clean
clean: ; rm --force $(targets)
