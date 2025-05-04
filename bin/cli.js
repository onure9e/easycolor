#!/usr/bin/env node

'use strict';

const colorizer = require('../index');
const fs = require('fs');
const path = require('path');

// Get command-line arguments
const args = process.argv.slice(2);

// Show usage information
function showHelp() {
  console.log(`
  ${colorizer.bold('easycolor')} - A simple tool for coloring terminal outputs
  
  ${colorizer.bold('Usage:')}
    easycolor <command> [options]
    
  ${colorizer.bold('Commands:')}
    ${colorizer.green('text')}      <color> <text>  Writes the text in the specified color
    ${colorizer.green('rainbow')}   <text>         Writes the text in rainbow colors
    ${colorizer.green('random')}    <text>         Writes the text in a random color
    ${colorizer.green('demo')}                      Displays a demo of all colors
    ${colorizer.green('help')}                      Displays this help message
    
  ${colorizer.bold('Colors:')}
    black, red, green, yellow, blue, magenta, cyan, white
    brightBlack, brightRed, brightGreen, brightYellow, brightBlue, brightMagenta, brightCyan, brightWhite
    
  ${colorizer.bold('Styles:')}
    bold, dim, italic, underline, blink, inverse, hidden, strikethrough
    
  ${colorizer.bold('Examples:')}
    easycolor text red "This is red text"
    easycolor rainbow "Rainbow text"
    easycolor text bold "Bold text"
    echo "Some text" | easycolor text green
  `);
}

// Display a demo of all colors
function showDemo() {
  console.log(colorizer.bold('\nTEXT COLORS:'));
  console.log(colorizer.black('■ Black'));
  console.log(colorizer.red('■ Red'));
  console.log(colorizer.green('■ Green'));
  console.log(colorizer.yellow('■ Yellow'));
  console.log(colorizer.blue('■ Blue'));
  console.log(colorizer.magenta('■ Magenta'));
  console.log(colorizer.cyan('■ Cyan'));
  console.log(colorizer.white('■ White'));
  
  console.log(colorizer.bold('\nBRIGHT TEXT COLORS:'));
  console.log(colorizer.brightBlack('■ Bright Black'));
  console.log(colorizer.brightRed('■ Bright Red'));
  console.log(colorizer.brightGreen('■ Bright Green'));
  console.log(colorizer.brightYellow('■ Bright Yellow'));
  console.log(colorizer.brightBlue('■ Bright Blue'));
  console.log(colorizer.brightMagenta('■ Bright Magenta'));
  console.log(colorizer.brightCyan('■ Bright Cyan'));
  console.log(colorizer.brightWhite('■ Bright White'));
  
  console.log(colorizer.bold('\nSTYLES:'));
  console.log(colorizer.bold('■ Bold'));
  console.log(colorizer.dim('■ Dim'));
  console.log(colorizer.italic('■ Italic'));
  console.log(colorizer.underline('■ Underline'));
  console.log(colorizer.blink('■ Blink'));
  console.log(colorizer.inverse('■ Inverse'));
  console.log(colorizer.strikethrough('■ Strikethrough'));
  
  console.log(colorizer.bold('\nBACKGROUND COLORS:'));
  console.log(colorizer.bgBlack(colorizer.white('■ Background Black')));
  console.log(colorizer.bgRed('■ Background Red'));
  console.log(colorizer.bgGreen('■ Background Green'));
  console.log(colorizer.bgYellow(colorizer.black('■ Background Yellow')));
  console.log(colorizer.bgBlue('■ Background Blue'));
  console.log(colorizer.bgMagenta('■ Background Magenta'));
  console.log(colorizer.bgCyan(colorizer.black('■ Background Cyan')));
  console.log(colorizer.bgWhite(colorizer.black('■ Background White')));
  
  console.log(colorizer.bold('\nBRIGHT BACKGROUND COLORS:'));
  console.log(colorizer.bgBrightBlack(colorizer.white('■ Background Bright Black')));
  console.log(colorizer.bgBrightRed('■ Background Bright Red'));
  console.log(colorizer.bgBrightGreen(colorizer.black('■ Background Bright Green')));
  console.log(colorizer.bgBrightYellow(colorizer.black('■ Background Bright Yellow')));
  console.log(colorizer.bgBrightBlue('■ Background Bright Blue'));
  console.log(colorizer.bgBrightMagenta('■ Background Bright Magenta'));
  console.log(colorizer.bgBrightCyan(colorizer.black('■ Background Bright Cyan')));
  console.log(colorizer.bgBrightWhite(colorizer.black('■ Background Bright White')));
  
  console.log(colorizer.bold('\nCOMBINATIONS:'));
  console.log(colorizer.bold(colorizer.red('■ Bold Red')));
  console.log(colorizer.underline(colorizer.green('■ Underline Green')));
  console.log(colorizer.bgYellow(colorizer.blue('■ Blue on Yellow')));
  console.log(colorizer.bold(colorizer.bgMagenta(colorizer.white('■ Bold White on Magenta'))));
  
  console.log(colorizer.bold('\nSPECIAL EFFECTS:'));
  console.log(colorizer.rainbow('■■■ Rainbow Text ■■■'));
  console.log(colorizer.random('■ Random Color ■') + ' (changes every time)');
}

// Read data from stdin
function processStdin(color) {
  let data = '';
  
  process.stdin.on('data', (chunk) => {
    data += chunk;
  });
  
  process.stdin.on('end', () => {
    data = data.trim();
    if (color === 'rainbow') {
      console.log(colorizer.rainbow(data));
    } else if (color === 'random') {
      console.log(colorizer.random(data));
    } else if (colorizer[color]) {
      console.log(colorizer[color](data));
    } else {
      console.error(colorizer.red(`Error: "${color}" is not a valid color.`));
      process.exit(1);
    }
  });
}

// Command-line handler
function main() {
  // If waiting for data from stdin
  if (!process.stdin.isTTY && args.length > 0) {
    processStdin(args[0]);
    return;
  }
  
  if (args.length === 0 || args[0] === 'help') {
    showHelp();
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'demo':
      showDemo();
      break;
      
    case 'rainbow':
      if (args.length < 2) {
        console.error(colorizer.red('Error: Text is required for the rainbow command.'));
        process.exit(1);
      }
      console.log(colorizer.rainbow(args.slice(1).join(' ')));
      break;
      
    case 'random':
      if (args.length < 2) {
        console.error(colorizer.red('Error: Text is required for the random color command.'));
        process.exit(1);
      }
      console.log(colorizer.random(args.slice(1).join(' ')));
      break;
      
    case 'text':
      if (args.length < 3) {
        console.error(colorizer.red('Error: Color and text are required for the text command.'));
        process.exit(1);
      }
      
      const colorName = args[1];
      const text = args.slice(2).join(' ');
      
      if (!colorizer[colorName]) {
        console.error(colorizer.red(`Error: "${colorName}" is not a valid color or style.`));
        process.exit(1);
      }
      
      console.log(colorizer[colorName](text));
      break;
      
    default:
      console.error(colorizer.red(`Error: "${command}" is not a valid command.`));
      showHelp();
      process.exit(1);
  }
}

// Run the main program
main();