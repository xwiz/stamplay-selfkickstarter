# stamplay-selfkickstarter
========================

![selfkickstarter](https://www.dropbox.com/s/ny1hy7nfjiih9pz/Screenshot%202014-11-27%2010.52.53.png?dl=0 "selfkickstarter")

**This project is built on the [Stamplay](https://stamplay.com) platform and [AngularJS](http://angularjs.org) to show how to build a  landing page to raise funds leveraging Stripe integration,
let's say something similar to [KickStarter](http://kickstarter.com) but done in the blink of an eye.**

You can test it anytime simply creating a new project on Stamplay and uploading all the frontend assets with our client or our browser based code editor. 

Feel free to implement more cool features (see the last paragraph for ideas), contribute to this repo or clone it to use it by your own scopes. For any question drop an email to [giuliano.iacobelli@stamplay.com](mailto:giuliano.iacobelli@stamplay.com)

-----------------------
## KickStarter

This is a demo of what you can achieve with Stamplay,it's somewhat a clone of [kickStarter](http://kickstarter.com) and here you can see it up and running [https://241592.stamplay.com](https://241592.stamplay.com)

We love javascript and front end framework and this time we show you how you can create this app using [AngularJS](http://angularjs.org) to implement the client side logic. Here are the user stories for this example:

* Guest users can signup with Facebook
* Logged users can donate a fixed amount for you project
* Logged users can ask you any informations with the submit of a form
* Admins can set a goal of the campaign 
* Admins can be notified when a user is charged
* Admins can see all payment details via Stripe dashboard

Best of all, we used AngularJS :) Prepare to be amazed.

-----------------------
# Anatomy

self-KickStarter is built around the following building blocks

* [User](http://stamplay.readme.io/v0/docs/user-component)
* [Custom Objects](http://stamplay.readme.io/v0/docs/working-with-custom-object)
* [Stripe](http://stamplay.readme.io/v0/docs/description)
* [Form](http://stamplay.readme.io/v0/docs/working-with-form)
* [Email](http://stamplay.readme.io/v0/docs/working-with-email)


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

**Stripe Configuration**

User ID : {{user._id}}


### When a customer is charged, then add an item to the cobject collection 


Trigger : Stripe - Charge

Action: Custom Object - Create 

**Custom Object Configuration**

Cobject Schema: Backer

lastfour:  {{customer.card.last4}}

user: {{customer.userId}}

### When a new form entry is submitted, notify the application owner with an email

Trigger : Form - On submit

Action: Email - Send Email

**Form submit configuration**

	From: Contact

**Send Email configuration**

	to: info@mydomain.com 
	from: {{entry.data.email}} 
	from name: {{entry.data.email}} 
	Subject: {{entry.data.email}}
	Body: {{entry.data.message}}

_______________________________


# Managing the app

First of all connect your Stripe Account on Stamplay Editor, this necessary for 
Everytime you create reasource using Custom Object you can manage instances of the entities in the Admin section. This will let you to easily add edit 

-----------------------

## The frontend and AngularJS





-----------------------

# Cloning

First, clone this repository :

    git clone git@github.com:Stamplay/stamplay-selfkickstarter
    
Or download it as a zip file
	
	https://github.com/Stamplay/stamplay-selfkickstarter/archive/master.zip 

Then you need to upload the frontend files in your app and you can do it in two ways:

* Copy/Upload them via the Layout section of your app on Stamplay editor
* Download and run **Stamplay Sync**, make it download the frontend assets of your app and then replace them with the ones you got from this repo. Stamplay Sync will upload everything for you on your app.


-----------------------
# Next steps

Here are a few ideas for further improvement :

* add social login like Google to enrich user's identity
* if the cart contains more occurencies of a meal, group them
* let users to comment on the restaurants
* _Your idea here… ?_

Again, for any questions drop an email to [giuliano.iacobelli@stamplay.com](mailto:giuliano.iacobelli@stamplay.com) :)

Ciao!
