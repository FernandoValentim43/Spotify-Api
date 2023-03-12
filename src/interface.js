const readline = require("readline");

function getUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const menu = `
What do you want to do?
1. Fetch new songs from Spotify
2. Save the songs into MongoDB
3. Quit
`;

  function prompt() {
    rl.question(menu, async (answer) => {
      switch (answer) {
        case "1":
          console.log("Fetching new songs from Spotify...");
          break;
        case "2":
          console.log("Saving songs into MongoDB...");
          break;
        case "3":
          rl.close();
          process.exit(); // add this line to exit the app
          break;
        default:
          console.log("Invalid choice, please try again.");
          break;
      }

      if (answer !== "3") {
        prompt();
      }
    });
  }

  prompt();
}

module.exports = getUserInput;
