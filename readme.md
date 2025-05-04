# EasyColor

A simple Node.js package and command-line tool for coloring terminal outputs.

## Features

- Text coloring with a simple API
- 16 different text colors and 16 different background colors
- Text styles like bold, italic, underline
- Rainbow and random coloring effects
- Both programmatic and command-line usage
- Apply multiple styles with chain methods

## Installation

```bash
npm install @onurege3467/easycolor --global
```

To use only in your project:

```bash
npm install @onurege3467/easycolor --save
```

## Command-Line Usage

```bash
# Text coloring
easycolor text red "This is red text"

# Rainbow effect
easycolor rainbow "Rainbow text"

# Random color
easycolor random "This is randomly colored text"

# Bold text
easycolor text bold "This is bold text"

# Using pipes
echo "Hello World" | easycolor text green

# Demo display
easycolor demo

# Help
easycolor help
```

## Programmatic Usage

```javascript
const @onurege3467/easycolor = require('@onurege3467/easycolor');

// Simple coloring
console.log(@onurege3467/easycolor.colorize('Red text','red'));
console.log(@onurege3467/easycolor.colorize('Text with yellow background','bgYellow'));
console.log(@onurege3467/easycolor.colorize('Bold text','bold'));

// Apply multiple styles with chain methods
console.log(
  @onurege3467/easycolor.chain('Blue and bold text')
    .blue()
    .bold()
    .toString()
);

// Rainbow effect
console.log(@onurege3467/easycolor.rainbow('Rainbow text'));

// Random color
console.log(@onurege3467/easycolor.random('Randomly colored text'));

// Colored console logging
console.log(@onurege3467/easycolor.colorize('✓ Operation successful','green'));
console.log(@onurege3467/easycolor.colorize('✗ An error occurred','red'));
console.log(@onurege3467/easycolor.colorize('⚠ Warning message','yellow'));
```

## Supported Colors and Styles

### Text Colors
- `black`
- `red`
- `green`
- `yellow`
- `blue`
- `magenta`
- `cyan`
- `white`
- `brightBlack`
- `brightRed`
- `brightGreen`
- `brightYellow`
- `brightBlue`
- `brightMagenta`
- `brightCyan`
- `brightWhite`

### Background Colors
- `bgBlack`
- `bgRed`
- `bgGreen`
- `bgYellow`
- `bgBlue`
- `bgMagenta`
- `bgCyan`
- `bgWhite`
- `bgBrightBlack`
- `bgBrightRed`
- `bgBrightGreen`
- `bgBrightYellow`
- `bgBrightBlue`
- `bgBrightMagenta`
- `bgBrightCyan`
- `bgBrightWhite`

### Text Styles
- `bold`
- `dim`
- `italic`
- `underline`
- `blink`
- `inverse`
- `hidden`
- `strikethrough`

## API Reference


### Chain Method
```javascript
@onurege3467/easycolor.chain(text)
  .color1()
  .color2()
  .style()
  .toString()
```

### Special Effects
```javascript
@onurege3467/easycolor.rainbow(text)
@onurege3467/easycolor.random(text)
```

### Terminal Support
```javascript
// Check terminal color support
const isSupported = @onurege3467/easycolor.isSupported();

// Disable colors
@onurege3467/easycolor.disable();

// Enable colors
@onurege3467/easycolor.enable();
```

