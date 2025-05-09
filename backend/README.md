# Backend README
This folder contains architecture relating to the backend microservices for HerHealthHub.

## Services
These are the services that are a part of our architecture:
- `api-gateway`: a service to forward requests to other services. This is based on lecture material.
- `registry`: a service to register the URLs of other services. This is based on lecture material as well.
- `service-schedule`: a service for the Schedule Page (js/node/express)
- `journal-service`: a service for the Journal Page (js/node/express)
- `service-profile`: a service for the Profile Page (js/node/express)
- `service-documents`: a service for the Documents portion of the Profile Page (js/node/express)

## Things of Note
Right now, the api-gateway and registry are copies of what is used in class. These can be edited or changed entirely to match what is needed for our application. 

**In addition, this is static code, rather than completed and working code. This needs to be tested later on to ensure that it is working with the application.**

For the time being, I'm also adding all services a-d as examples to use when creating your microservice. These will need to be deleted later on. They are currently hosted under /example-microservices.

We'll need to thoroughly check to see if this works too. 

