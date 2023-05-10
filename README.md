# Scaling-CRUD
This Project is about creating the backend where CRUD ( Create, Read, Update, Delete ) operations are carried out on the user in memory database.
Steps to setup the project:
1) Create the express app for load balancer and make that listen on port 4000
2) Create four servers for each API request using http-proxy package of npm 
3) Created the proxy servers for 4 requests respectively.
4) Created the 4 apis i.e. POST(4001), GET(4002), PUT(4003), DELETE(4004).

Actually what happens behind the scene is request is send to the load balancer which is listening on port 4000,
it then forwards the requests based on the req.method to their respective port numbers i.e. POST is forwarded to port 4001, GET is forwarded
to port 4002, PUT to port 4003 and DELETE to port 4004.
