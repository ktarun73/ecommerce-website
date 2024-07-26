# E-Commerce Project

**Student Name**: Tarun Kumar 
**Student Number**: 8979770 
**Date**: 19-07-2024

### Technology Stack

**Frontend**: ReactJS  
**Backend**: Node.js with Express  
**Database**: MongoDB (Atlas)

### Project Setup

1. **Project Initialization**: Repository created on local machine and pushed to github
2. **Frontend Setup**: Initialized ReactJS project.
3. **Backend Setup**: Initialized Node.js project with Express. 

### Database Schema Design

**Users Schema (MongoDB)**

- `userId`: ObjectId
- `username`: String
- `email`: String
- `password`: String
- `role` : String
- `createdAt`: Date
- `updatedAt`: Date


**Products Schema (MongoDB)**

- `productId`: ObjectId
-`name`: String
-`description`: String
-`price`: Number
-`image`: String // URL of the product image
-`stock`: Number
-`createdAt`: Date
-`updatedAt`: Date

 
**Orders Schema (MongoDB)**

-`orderId`: ObjectId
-`userId`: ObjectId (Users collection)
-`categoryId`: ObjectId (Category collection)
-`address`: String
-`totalPrice`: Number
-`createdAt`: Date
-`updatedAt`: Date


**Order_Products Schema (MongoDB)**

-`orderProductId`: ObjectId
-`orderId`: ObjectId (Orders collection)
-`productId`: ObjectId (Products collection)
-`quantity`: Number



### Frontend Setup

1. Frontend React app is created

### Backend Setup

1. Node Js project initalized 

### Notes

- The project is set up using VS Code and Git is used for version control.
- Both frontend and backend projects are initalized
- Backend Project is connected to mongodb atlas
- I have added a category schema for products

