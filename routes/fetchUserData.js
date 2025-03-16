// const express = require("express");
// const router = express.Router();
// const connection = require("../database/db");
// const Axios = require("axios");
// router.post("/fetchUserData", async (req, res) => {
//   if (!req.body.token) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const token = req.body.token;

//   if (!token) {
//     token = "";
//   }

//   const result = await fetchGmailMessages(token);
//   if (!result) {
//     res.status(400).json({ error: "Failed to fetch user data" });
//   } else {
//     res
//       .status(200)
//       .json({ message: "fetched user data successfully", data: result });
//   }
// });
// const fetchGmailMessages = async (token) => {
//   if (!token) {
//     console.warn("No access token available to fetch Gmail messages.");
//     return;
//   }

//   try {
//     const response = await Axios.get(
//       "https://gmail.googleapis.com/gmail/v1/users/me/messages",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data, "mail data");
//     // const listData = await response.json();
//     const messageIds = data.messages;

//     const fullMessages = [];
//     for (const message of messageIds) {
//       const getResponse = await Axios.get(
//         `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!getResponse.ok) {
//         throw new Error(
//           `HTTP error fetching message ${message.id}: ${getResponse.status}`
//         );
//       }
 
//       const messageData = await getResponse.json();
//       return messageData;
//       // console.log(messageData, "message data")
//       fullMessages.push(messageData);
//       // setMessages(data.messages || ''); // Update state with messages
//     }

//     return fullMessages;
//   } catch (error) {
//     return error;
//   }
// };

// module.exports = router;
const express = require("express");
const router = express.Router();
const Axios = require("axios");

router.post("/fetchUserData", async (req, res) => {
  if (!req.body.token) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const token = req.body.token;

  try {
    const result = await fetchGmailMessages(token);
    if (!result) {
      return res.status(500).json({ error: "Failed to fetch user data" }); // Or a more specific error
    } else {
      res
        .status(200)
        .json({ message: "fetched user data successfully", data: result });
    }
  } catch (error) {
    console.error("Error in /fetchUserData:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const fetchGmailMessages = async (token) => {
  if (!token) {
    console.warn("No access token available to fetch Gmail messages.");
    return null; // Or you might throw an error here if it's critical
  }

  try {
    const response = await Axios.get(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    console.log(data, "data");
    const messageIds = data.messages;

    const fullMessages =[];
    let count = 0
    if (messageIds && count < 20) {
      for (const message of messageIds) {
        if (count > 20) {
          break
        }
        const getResponse = await Axios.get(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const messageData = getResponse.data;
        console.log(messageData, "message data");
        fullMessages.push(messageData);
        count =count + 1
      }
    }

    return fullMessages;
  } catch (error) {
    console.error("Error in fetchGmailMessages:", error);
    return null; // Or handle the error as needed
  }
};

module.exports = router;