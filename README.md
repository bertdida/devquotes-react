# devquotes-react

Frontend source code for [devquotes-react.vercel.app](https://devquotes-react.vercel.app/); this React app consumes the [REST API](https://github.com/bertdida/devquotes-flask) built on Flask.

## Built With

- React
- Material UI
- Firebase for authentication
- NPM for managing dependencies
- Netlify as hosting provider

## Features

|                                       | Anonymous | Authenticated | Admin |
| ------------------------------------- | :-------: | :-----------: | :---: |
| [PWA](https://web.dev/what-are-pwas/) |    ✔️     |      ✔️       |  ✔️   |
| Like and unlike quote                 |    ❌     |      ✔️       |  ✔️   |
| View liked quotes                     |    ❌     |      ✔️       |  ✔️   |
| Share quotes on Facebook or Twitter   |    ✔️     |      ✔️       |  ✔️   |
| Search quotes                         |    ✔️     |      ✔️       |  ✔️   |
| Submit quote                          |    ❌     |      ✔️       |  ❌   |
| Create quote                          |    ❌     |      ❌       |  ✔️   |
| Edit quote                            |    ❌     |      ❌       |  ✔️   |
| Mark quote as publish or spam         |    ❌     |      ❌       |  ✔️   |
| Delete quote                          |    ❌     |      ❌       |  ✔️   |
| Filter quotes                         |    ❌     |      ❌       |  ✔️   |
| Toggle dark or light theme            |    ✔️     |      ✔️       |  ✔️   |

## Local Environment

_This project requires a running environment of devquotes-flask. [Check out this guide](https://github.com/bertdida/devquotes-flask#readme) of how to run devquotes-flask locally._

Clone this repo and install the dependencies by running:

```bash
$ git clone https://github.com/bertdida/devquotes-react
$ cd devquotes-react
$ npm install
```

_Firebase API key and auth domain are required for authentication to work. You will get these when you set up devquotes-flask._

Rename [.env.example](https://github.com/bertdida/devquotes-react/blob/master/.env.example) to remove .example and set `REACT_APP_FIREBASE_API_KEY` and `REACT_APP_FIREBASE_AUTH_DOMAIN` to their appropriate values; these 2 are the minimum required configuration to run the app.

Finally, start the app.

```bash
$ npm start
```

## Contributing

Any contributions are always welcome! If you have any problem, idea, or suggestion for the project, feel free to create issues or pull requests.

## Author

Herbert Verdida / [@bertdida](https://twitter.com/bertdida)
