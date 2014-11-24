# stamplay-selfkickstarter
========================

![selfkickstarter](http://2.bp.blogspot.com/-WL8GetRAOog/ULT1dTj-4PI/AAAAAAABGCg/_oSuT6xY2Uo/s1600/foodme.png "FoodMe")

**This project is built on the [Stamplay](https://stamplay.com) platform and [AngularJS](http://angularjs.org) to show how to build a  landing page to raise funds leveraging Stripe integration,
let's say something similar to [kickStarter](http://kickstarter.com) but done in the blink of an eye.**

You can test it anytime simply creating a new project on Stamplay and uploading all the frontend assets with our client or our browser based code editor. 

Feel free to implement more cool features (see the last paragraph for ideas), contribute to this repo or clone it to use it by your own scopes. For any question drop an email to [giuliano.iacobelli@stamplay.com](mailto:giuliano.iacobelli@stamplay.com)

-----------------------
## KickStarter

This is a demo of what you can achieve with Stamplay,it's somewhat a clone of [kickStarter](http://kickstarter.com) and here you can see it up and running [https://241592.stamplay.com](https://241592.stamplay.com)

We love javascript and front end framework and this time we show you how you can create this app using [AngularJS](http://angularjs.org) to implement the client side logic. Here are the user stories for this example:

* Guest users can signup with Facebook
* Logged users can donate a fixed amount for you project.
* Logged users can ask you any informations with a form.
* Admins can set a goal of the campaign 
* Admins can be notified when a user is charged
* Admins can see all payment details via Stripe dashboard

Best of all, we used AngularJS :) Prepare to be amazed.

-----------------------
# Anatomy

self-KickStarter is built around the following building blocks

* [User](https://www.stamplay.com/docs#user)
* [Custom Objects](https://www.stamplay.com/docs#customobject)
* [Stripe](https://www.stamplay.com/docs#)
* [Form](https://www.stamplay.com/docs#form)
* [Email](https://www.stamplay.com/docs#email)


## Requirements

Go to [your account](http://editor.stamplay.com/apps) and create a new app.


## Configuring the components

After creating a new app on [Stamplay](https://editor.stamplay.com) let's start by picking the component we want to use in our app that are: **User**,**Custom Objects**,**Stripe**, **Form** and  **Email**.

Lets see one-by-one how they are configured:

### User
the app leverages Facebook Login to provide an easy login to its users. In order to activate yours you need to get an APPID and APPSecret on [Facebook Developer's portal](http://developers.facebook.com/apps), create an app and add Stamplay.com as authorized domain as you can see in the pic below. 

![Facebook app settings](http://blog.stamplay.com/wp-content/uploads/2014/07/Schermata-2014-07-22-alle-17.43.24.png "Facebook app settings")

now you have the data to configure Facebook Login on your app's user module. Go back on Stamplay, select the user component, add Facebook as signup service and then cut and paste the App ID and App Secret and click save.


### Custom Object
Let's define the entities for this app, we will define **Backer** and **Found** that are defined as follows:

##### Backer

* Name: `lastfour`, Type: `string`, The last four of the credit card
* Name: `user`, Type: `user relation`, The user reference 

##### Found

* Name: `money`, Type: `number`, The total amount raised until now

After setting up this Stamplay will instantly expose Restful APIs for our newly resources the following URIs: 

* `https://APPID.stamplay.com/api/cobject/v0/backer`
* `https://APPID.stamplay.com/api/cobject/v0/found`

### Stripe

Connect your account simply by clicking on Connect button and choose between live or test mode.   

### Form

Form component is used to create a contact form in the kickStarter of our users will be able to write to the owner of the page. The form will have 3 fields:

* Name: `email`, Type: `text`, The sender's email address
* Name: `subject`, Type: `text`, The email's subject 
* Name: `message`, Type: `text`, The message

### Email
This component doesn't need any setup, couldn't be easier than that ;)

-----------------------


## Creating the server side logic with Tasks

Now let's add the tasks that will define the server side of our app. For our app we want that:

### When a user sign up, then create a new Stripe customer 

Trigger : User - Sign up

Action: Stripe - Create Customer

** Stripe Configuration

User ID : {{user._id}}


### When a customer is charged, then add an item to the cobject collection 


Trigger : Stripe - Charge

Action: Custom Object - Create 

** Custom Object Configuration

User ID : {{user._id}}

**Form submit configuration**

	Custom Object: Order

**Send Email configuration**

	to: {{coinstance.email}} //The recipient address taken from the order info 
	from: foodme@stamplay.com 
	name: Stamplay FoodMe
	Subject: "Thanks for ordering with Stamplay FoodMe"
	Body: "Hi {{coinstance.surname}}, <br/> 
			your order are : {{coinstance.meals}} <br/>
			the final price is : {{coinstance.price}} € <br/>
			and it will be delivered at {{coinstance.address}}<br/>
			<br/>
			thanks for choosing Stamplay FoodMe<br/>
			regards"



### When a new order is submitted, notify the restaurant owner with an email

Trigger : Custom Object - New instance

Action: Email - Send Email

**Form submit configuration**

	Webhook name: ordercomplete

**Send Email configuration**

	to: {{incoming.body.restaurant_owner_email}} 
	from: foodme@stamplay.com 
	name: Stamplay FoodMe 
	Subject: "Thanks for ordering with Stamplay FoodMe"
	Body: "Good news! <br/><br/>

			A new order has been placed via FoodMe for your restaurant. 
			Here are the details:<br/><br/>

			Surname: {{incoming.body.order.surname}}  <br/>
			Email: {{incoming.body.order.email}} <br/>
			Meals: {{incoming.body.order.meals}} <br/>
			<br/><br/>
			Total: {{incoming.body.order.price}} <br/>

			Hurry up "



_______________________________


## The frontend and AngularJS

The whole app is written in two files: `app.js` e `restaurantRating.js`
**App.js** has all the controllers and two factories while **restaurantRating.js** has the directive to handle restaurant ratings.


### App.js

##### Factory UserStatus:
This Factory is in charge of tracking user status via the **User** `getStatus` API call and expose it to controllers who require it. It acts as a simple caching layer between user status and controllers
Whenever one or more controller on the same page are in need to know the user status the API call would be effectively done only one time

##### Factory globalVariable:
This component provides access to global functionalities and variables to avoid code duplication. 

##### Controller NavbarCtrl:
This controller is the only one present in every view of this app since it's binded to the main navigation bar of the app.

It must be able to recognize user status showing `Login/Logout` button, and moreover it is responsible of understanding the current page visited by the user to highlight it on the navigation bar (check `function RouteIs`).

##### Controller LoginCtrl:
This is the controller in charge to make the API call to the login endpoint for email+password authentication.

##### Controller RegistrationCtrl
This controller is in charge for to make the API requests to the signup endpoint for email+password authentication. 

##### Controller RestaurantCtrl
This controller handles the restaurant list. It listens for filter selection on the home page and update the list accordingly. It has also expose sorting functionalities to rank restaurant by Name, rating or price.

##### Controller MenuCtrl
This controller is in charge for orders and displaying menu details of the restaurant.
`getRestaurant` retrieves params from the URL and lookup for the restaurant instance by  `_id`.
Once loaded it:
* check the userstatus (if he is logged, we need to know if he already rated this restaurant)
* loads the meals related to the current restaurant and retrieves details for each one
* `addToCart` and `removeToCart` functions are responsible to add or remove items from the cart
* `checkout` function triggers the order completion process. It validates every field before sending the data to the server.


### restaurantRating.js
AngularJS directives are what controls the rendering of the HTML inside an AngularJS application. 

It is possible to implement your own directives too. This is what AngularJS refers to as "teaching HTML new tricks". Here a custom directive called `fm-rating` has been declard and it will display the rating controls. Rating controls are displayed to filter restaurants in the homepage or to let users assign a rating in the restaurant profile page.


####Triggering the webhoook
After a succesfull order we will send a POST request to the webhook `ordercomplete`  containing the order data and the restaurant owner infos  ```$scope.checkout = function(restaurant){...}```. This is easily done by the few lines showed below:


	var hookData = {
            restaurant_owner_email : restaurant.owner_email,
            order: data
          }

          $http({method:'POST',data: hookData, url:'/api/webhook/v0/ordercomplete/catch'})
            .success(function(data, status){})
            .error(function(data, status){
              $scope.modal.error = 'Ops Something went Wrong'
           	})


-----------------------


# Managing the app

Everytime you create reasource using Custom Object you can manage instances of the entities in the Admin section. This will let you to easily add edit and delete restaurant, meals and orders.

![Manage Restaurant](http://blog.stamplay.com/wp-content/uploads/2014/09/Schermata-2014-09-03-alle-14.05.29.png "Manage restaurant")


-----------------------
# Cloning

First, clone this repository :

    git clone git@github.com:Stamplay/stamplay-foodme
    
Or download it as a zip file
	
	https://github.com/Stamplay/stamplay-foodme/archive/master.zip 

Then you need to upload the frontend files in your app and you can do it in two ways:

* Copy/Upload them via the Layout section of your app on Stamplay editor
* [Get Stamplay sync](http://cdn.stamplay.com/stamplay-sync/stamplay-sync.zip) and run **Stamplay Sync**, make it download the frontend assets of your app and then replace them with the ones you got from this repo. Stamplay Sync will upload everything for you on your app.


-----------------------
# Next steps

Here are a few ideas for further improvement :

* bring together login and registration controllers by creating a single page to handle both user login and signup
* add social login like Facebook or Google to enrich user's identity
* if the cart contains more occurencies of a meal, group them
* let users to comment on the restaurants
* _Your idea here… ?_

Again, for any questions drop an email to [giuliano.iacobelli@stamplay.com](mailto:giuliano.iacobelli@stamplay.com) :)

Ciao!
