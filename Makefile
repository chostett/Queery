#Makefile for Queery
#Let's hope I know what I'm doing...

start:
	meteor 1>logs/server.log 2>logs/server.err

status:

#change localhost to the domain once we register it
deploy:
	meteor deploy 127.0.0.1

