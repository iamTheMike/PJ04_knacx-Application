# API by NestJs with Typescript 


### Feature
  * Connect to MySQL database by TypeORM 
  * Authentication with JWT Authentication
  * Caching by Redis on Products Route
  * Logging Middleware with save data to log file
  * Queue Management with Redis for Email Route to send emails
  * Export CSV file for Product data
  * Refresh  Token system
  * Provides containerized environments for efficient development and deployment by Docker
    

### ENV
  * Create`.env` file ,See example in .env.example (Note: You have to set the email and password using your Gmail email service others use default setting)
  

## Installation
```
git clone https://github.com/iamTheMike/PJ04_knacx-Application.git
cd PJ04_knacx-Application
docker-compose up -d --build 
npm install
code .
```

# **Note**
 Bedore start raname .env.example to be .env use default setting and You have to set the email and password using your Gmail email service others use default setting

## Start development
```
npm run start:dev
```








        
  
  

