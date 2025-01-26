# API by NestJs with Typescript 


### Feature
  * Connect to MySQL database by TypeORM 
  * Authentication with JWT Authentication and Cookie
  * Caching by Redis on Products Route
  * Logging Middleware with save data to log file at logs folder
  * Queue Management with Redis for Email Route to send emails
  * Export CSV file for Product data
  * Refresh Token system
  * Provides containerized environments for efficient development and deployment by Docker
  * API Document by swagger (Not Complete yet but can use 😅 )
    

### ENV
 Before start you have to rename (.env.example) to be (.env) use default setting and set the email and password using your Gmail email service others use default setting in this .env file
  

## Installation
```
git clone https://github.com/iamTheMike/PJ04_knacx-Application.git
cd PJ04_knacx-Application
docker-compose up -d --build 
npm install
code .
```

# **Note**
 Before start you have to rename (.env.example) to be (.env) use default setting and set the email and password using your Gmail email service others use default setting in this .env file

## Start development
```
npm run start:dev
```

## API Document
```
http://localhost:3000/api
```
## Database service by PMA
```
http://localhost:8080/
```






        
  
  

