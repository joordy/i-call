# 📹 **iCall video platform**

## ✏️ **Description**

iCall is a multi-user video platform where you can connect with your friends, based on a WebRTC connection. The app makes it possible to have a video connection, chat functionality, and a command to send random Cat Facts using the [catfacts](#-api) API. The app will be made with NodeJS, Express, Express-Handlebars, Socket.io and PeerJS. Check out my [NPM Packages](#-npm-packages) to see which other packages I've used.

---

## 🚀 **Live view:**

You can visit the project [iCall application here](https://i-call.herokuapp.com/)

---

## ✏️ **Concepts**

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Location based volume</summary>

![Location based volume](https://user-images.githubusercontent.com/48051912/115362287-a8f01b00-a1c1-11eb-971c-141666ecdeb7.png)

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Location based rooms (map)</summary>

![Location based rooms (map)](https://user-images.githubusercontent.com/48051912/115362289-a988b180-a1c1-11eb-8ee9-a4a0b61ce4bd.png)

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Trending Twitter hashtags</summary>

![Trending Twitter hashtags](https://user-images.githubusercontent.com/48051912/115362285-a8578480-a1c1-11eb-890b-1855fb7fdd0b.png)

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Video platform with Cat Facts</summary>

![Videochat with Cat Facts](https://user-images.githubusercontent.com/48051912/115362276-a68dc100-a1c1-11eb-9706-419eef2efd32.png)

</details>

#### **Chosen Concept**

The concept I chose to develop is the video platform in combination with the CatFacts API.

---

## 💹 **Data Flow Diagram**

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

## 😺 **API**

The API I will use for this application is the [CatFacts API](https://github.com/alexwohlbruck/cat-facts). I chose this API to keep the application funnier. The response returned by the API is an array with 5 different results. Based on a random index number, a random fact is retrieved.

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Fetch the API data</summary>

```js
// Utils/fetch.js
const fetcher = async (endpoint) => {
  const data = await fetch(endpoint)
  const response = await data.json()
  return response
}

// Utils/socket.js
async function getRandomCatFact() {
  const response = await fetcher('https://cat-fact.herokuapp.com/facts')
  const num = Math.floor(Math.random() * 5) + 1
  const catFact = {
    message: `${response[num].text}`,
    user: 'CatFacts',
  }
  return catFact
}
```

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Response</summary>

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

</details>

---

## 🚀 **Features**

### **Video Connection**

lorem

### **Chat functionality**

lorem

### **Register/Signin **

lorem

### **Cat fact command**

lorem

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
  <!--

# ### **Deploy the project**

# - **Visit heroku**

# [https://www.heroku.com/](https://www.heroku.com/)

# - **Create app**

# Dashboard > New > Create new app

# - **Connect Github Repository**

# Set master branch as deployment branch

# - **Open application**

# On the custom domain which is how you've called your project

## -->

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
