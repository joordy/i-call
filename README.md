# Real-Time Web @cmda-minor-web · 2020/21

## **Concepts**

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Location based volume</summary>

![Location based volume](https://user-images.githubusercontent.com/48051912/114401933-a5e2a280-9ba3-11eb-9f24-d344fb150063.png)

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Location based rooms (map)</summary>

![Location based rooms (map)](https://user-images.githubusercontent.com/48051912/114401928-a54a0c00-9ba3-11eb-9542-4e321f737c30.png)

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Trending Twitter hashtags</summary>

![Trending Twitter hashtags](https://user-images.githubusercontent.com/48051912/114401919-a418df00-9ba3-11eb-96a4-f957322c5011.png)

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Videochat with Cat Facts</summary>

Image Coming Soon

</details>

<!-- Possible ideas:

- Real time live coder (codepen?)
- Zoom/Skype clone
- Realtime editor
- Realtime order system (food orderning)
  - https://github.com/codersgyan/realtime-pizza-app-node-express-mongo
  - https://www.youtube.com/watch?v=Mor2c9RW1Oo&list=PLXQpH_kZIxTVRmXQN9J0Az76te5mAreLV&index=10
- Game (snake?)
  - https://www.youtube.com/watch?v=0zTY73khJPM
  https://www.youtube.com/watch?v=ppcBIHv_ZPs&t=2217s
- Chat room based on preferences -->

---

## **Data Flow Diagram**

![Data flow Diagram](https://user-images.githubusercontent.com/48051912/114943487-5b348500-9e46-11eb-886e-7b3e709e4975.png)

<!-- # https://asciiflow.com/#/

# - Teken alle grote componenten (client, server, API)

# - Schrijf onder elk component wat er in het datamodel aanwezig is

# - Teken de lijnen/pijlen voor data die tussen componenten gedeeld worden

# - Voeg de methode voor verkrijgen en versturen van data (pub/sub, http request/response, socket request/response, authorization, Oauth)

# - Voeg deze data-flow toe aan je readme -->

## 🔦 **Description**

lorem

---

## 🌐 **Live link**

You can visit the [iCall application](https://i-call.herokuapp.com/) here

---

## 😺 **API**

### **Fetch**

```js
const fetcher = async (endpoint) => {
  const data = await fetch(endpoint)
  const response = await data.json()
  return response
}

const response = fetcher('https://cat-fact.herokuapp.com/facts')
```

### **Response**

```js
  {
    status: { verified: true, sentCount: 1 },
    type: 'cat',
    deleted: false,
    _id: '58e007cc0aac31001185ecf5',
    user: '58e007480aac31001185ecef',
    text: 'Cats are the most popular pet in the United States: There are 88 million pet cats and 74 million dogs.',
    __v: 0,
    source: 'user',
    updatedAt: '2020-08-23T20:20:01.611Z',
    createdAt: '2018-03-01T21:20:02.713Z',
    used: false
  }
```

## 🚀 **Features**

### **Sockets**

lorem

### **Peer.js**

lorem

- [peerJS](https://peerjs.com/)

---

## 📦 **NPM Packages**

- [DotEnv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
- [Express-Sessions](https://www.npmjs.com/package/express-sessions)
- [Express Socket.io Session](https://www.npmjs.com/package/express-socket.io-session)
- [Moment](https://www.npmjs.com/package/moment)
- [Node-fetch](https://www.npmjs.com/package/node-fetch)
- [Peer](https://www.npmjs.com/package/peer)
- [Socket.io](https://www.npmjs.com/package/socket.io)
- [Uuid](https://www.npmjs.com/package/uuid)

- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Eslint](https://www.npmjs.com/package/eslint)
- [Prettier](https://www.npmjs.com/package/prettier)

---

## 💻 **Installation**

### **Work on the project**

- **Clone the repository**
  ```bash
    git clone https://github.com/joordy/real-time-web-2021.git
  ```
- **Navigate to the repository and install the packages**
  ```bash
    npm install
  ```
- **Start local dev environment**

  ```bash
    npm run dev
  ```

- **Build export for deployment**
  ```bash
    npm run build
  ```

### **Deploy the project**

- **Visit heroku**

  [https://www.heroku.com/](https://www.heroku.com/)

- **Create app**

  Dashboard > New > Create new app

- **Connect Github Repository**

  Set master branch as deployment branch

- **Open application**

  On the custom domain which is how you've called your project

---

## 🔍 **Sources**

- https://peerjs.com/
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/getVideoTracks
- https://socket.io/

---

## 🔐 **License**

This is a repository which is licensed as [MIT](https://github.com/joordy/i-call/blob/master/LICENSE). Developed by Jordy Fronik ©️ 2021.

---

<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜  -->
