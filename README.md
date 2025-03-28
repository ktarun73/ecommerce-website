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

### Tests

1. Show products
2. show admin dashboard
3. Create Product
4. Read Product
5. Update Product
6. Delete Product
7. Create Category
7. Read Category
8. Update Category
9. Delete Category
10. Stock Will be decreased when user order
11. Login / Register

### Hard-coded credentials 

admin
username: admin 
password: admin

users
username: user1, user2
password for both: test

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
- Hardcoded an example product to mongodb atlas and created and api to fetch the product from the server
- Products are shown on frontend and added some css
- Created an api for user login using jsonweb token , (Tested using hardcoding an user at database)
- Made api url dynamic so that we do not have to change everywhere ,we just have to change it in .env file
- Created login and logut handle at frontend
- Added navbar to the application
- Added Api for category creation and fetch all
- Added api to find product by category
- Implemented Frontend to show products by category on main page
- Implemented cart page on frontend
- Startrted implementing product details page
- Developed an API to fetch single product details
- Implemented product details functionality
- I will implement rest appliaction in next phases
- In next phases I will develop - Checkout page, Orders page, Admin Page etc.
- Fixed bug in cart, increasing product quantity than stock is fixeds
- Implemented api for orders
- Implemted checkout page and order confirmation page
- Implemented api for my order
- My orders page created
- Added apis required for admin dashboard
- Implemented admin dashboard
- CRUD for categories , product 
- will implement admin to see all orders
- register user api and frontent implemented
- Stock will be reduced when user order
- Add to cart and buy button is disabled when stock is 0
- Implementd error boundary to react app , if some error occur then error page will be displayed






### Steps to run this project

1. Clone the git repo to local machine
2. navigate to ecommerce-backend in termial and explorer
3. run command 'npm install' in termial to install all required node modules
4. run command 'npm run dev' to run devleopmemt server
5. Now navigate to ecommerce-frontend in termial and explorer
6. Run command 'npm install' in termail to install all nodemodules which are required to run our project
7. run command 'npm start' to run server
8. Now browser will open and our application is running in the browser