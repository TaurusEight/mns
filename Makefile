
# Time-stamp: <2016-11-01 19:04:42 daniel>
# Makefile for proof of concept project MNS

%.html : %.slim ; slimrb $^ > $@
%.js : %.es6 ; cp $^ $@
%.app : %.go ; gccgo -o $@ $^


targets := content/tiger.html \
           content/penguin.html \
           index.html \
           edit.html \
           complete.html \
           js/edit.js \
           js/common.js \
           js/complete.js \
           scripts/mns.app


all : $(targets) ; @echo Build Complete!


.PHONY: clean
clean: ; @rm --force $(targets)
