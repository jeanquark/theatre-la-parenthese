# Théaâtre La Parenthèse

Théatre La Parenthèse est le site internet d'une troupe de théâtre.

![homepage](public/images/homepage.png)

## Content

To install Laravel packages (`vendor` folder):
```bash
	composer install
```

To specify application encryption key:
```bash
	php artisan key:generate
```

To install node packages (`node_modules` folder):
```bash
	npm install
```

To launch dev environment with Laravel Valet:
```bash
	npm run watch #or for hot reload:
	npm run hot
```

Valet path:
C:\Users\{{ USERNAME }}\AppData\Roaming\Composer\vendor\bin

To create and populate database tables:
```bash
	php artisan migrate:refresh
	php artisan db:seed
```

To open database, launch MySQL Workbench
To see the app, visit [theatre-la-parenthese.test](http://theatre-la-parenthese.test) in the browser

## Going live

Before pushing to GitHub, run:
```bash
	npm run prod
```

This app uses [pusher.js](https://www.pusher.com) for realtime updates on seat reservations. To allow for proper websocketing, make sure you published these environment variables in .env file:
+ BROADCAST_DRIVER=pusher
+ PUSHER_APP_ID=
+ PUSHER_APP_KEY=
+ PUSHER_APP_SECRET=
+ PUSHER_APP_CLUSTER=eu

## Team
- Gaël (frontend)
- Jean-Marc (backend)
