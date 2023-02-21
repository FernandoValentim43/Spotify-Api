const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Do you want to do A or B? ', (answer) => {
  if (answer === 'A') {
    console.log('You chose A');
    // Do something for option A
  } else if (answer === 'B') {
    console.log('You chose B');
    // Do something for option B
  } else {
    console.log(`Sorry, '${answer}' is not a valid choice`);
    // Handle invalid choice
  }

  rl.close();
});