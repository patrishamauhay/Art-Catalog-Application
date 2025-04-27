# Art Catalog Application
Enterprise Application Development Assignment

Patrisha Mauhay C21339643

TU857/4



**Simply Art Gallery** is a full-stack web application that allows users to browse, search, filter, and manage artworks.
Users can add artworks to their cart, favourite artworks, checkout to save artworks into "My Collection", and edit or remove their saved collection items.
The project demonstrates complete CRUD functionality on the frontend using LocalStorage.

## **Features:**
- Artworks Gallery: Browse artworks
- Search Functionality: Search for different artworks by title, artist, or medium
- Category Filters: Filter artworks by different mediums
- Sort By: Sort artworks by year or by title
- Pagination: Next/Previous Buttons
- Favourites: Mark artworks as favourites and view them in "My Favourites" section
- Cart Functionality (CRUD)
    - **Add** artworks to cart
    - **Increase/Decrease** quantity
    - **Delete** items
    - **Clear** cart
 - Checkout: On checkout, artworks are saved into "My Collection"
 - My Collection
    - **View** purchased artworks
    - **Edit** artwork titles
    - **Remove** artworks from collection
  - About this Page: Page explaining the application


## **Technologies Used:**
 - **Frontend**
     - HTML5
     - CSS3 + MDB UI Kit
     - JavaScript
 - **Backend**
     - Node.js
     - Express.js
     - MongoDB
 - **Storage**
     - LocalStorage for cart, favourites, and collection management

  
## **How to Run the Application**
1.  Clone or Download the Project

    `git clone https://github.com/patrishamauhay/Art-Catalog-Application
    `
    
    ` cd Art-Catalog-Application
    `

2. Install Backend Dependencies
   
    ` npm install
    `

3. Start the server
   
    ` node server.js
    `


## **Limitations/Weaknesses**
- Cart, Favourites, and My Collection are saved only in LocalStorage — clearing browser data will erase them.

- No user authentication — all users share the same session.

- Server uses a simple API without full backend validation.

- MongoDB is local; not deployed to cloud by default.



## **Possible Improvements**
- Add user login and accounts (private collections).

- Host MongoDB on a cloud provider (MongoDB Atlas).






