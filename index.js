'use strict';

/**
 * ANSI renk kodları
 */
const ANSI_CODES = {
  // Metin stilleri
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  blink: '\x1b[5m',
  inverse: '\x1b[7m',
  hidden: '\x1b[8m',
  strikethrough: '\x1b[9m',
  
  // Metin renkleri
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Parlak metin renkleri
  brightBlack: '\x1b[90m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
  
  // Arka plan renkleri
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
  
  // Parlak arka plan renkleri
  bgBrightBlack: '\x1b[100m',
  bgBrightRed: '\x1b[101m',
  bgBrightGreen: '\x1b[102m',
  bgBrightYellow: '\x1b[103m',
  bgBrightBlue: '\x1b[104m',
  bgBrightMagenta: '\x1b[105m',
  bgBrightCyan: '\x1b[106m',
  bgBrightWhite: '\x1b[107m'
};

/**
 * Tüm renk fonksiyonlarını içeren ana nesne
 */
const easycolor = {};

/**
 * Renk kodlarına doğrudan erişim
 */
easycolor.codes = ANSI_CODES;

/**
 * Metni renklendirir
 * @param {string} text - Renklendirilecek metin
 * @param {string} colorCode - Renk kodu
 * @returns {string} - Renklendirilmiş metin
 */
easycolor.colorize = (text, colorCode) => {
  return `${ANSI_CODES[colorCode]}${text}${ANSI_CODES.reset}`;
};

/**
 * Renk fonksiyonlarını oluştur
 */
Object.keys(ANSI_CODES).forEach(color => {
  // 'reset' hariç tüm kodlar için fonksiyon oluştur
  if (color !== 'reset') {
    easycolor[color] = (text) => easycolor.colorize(text, ANSI_CODES[color]);
  }
});

/**
 * Metin renklerini zincir şeklinde kullanma
 */
easycolor.chain = (text) => {
  const chain = {
    text,
    applied: [],
    
    apply(style) {
      this.applied.push(style);
      return this;
    }
  };
  
  // Tüm stilleri zincir nesnesine ekle
  Object.keys(ANSI_CODES).forEach(style => {
    if (style !== 'reset') {
      chain[style] = function() {
        return this.apply(ANSI_CODES[style]);
      };
    }
  });
  
  // Son çıktıyı oluşturmak için
  chain.toString = function() {
    let result = '';
    this.applied.forEach(style => {
      result += style;
    });
    result += this.text + ANSI_CODES.reset;
    return result;
  };
  
  return chain;
};

/**
 * Gökkuşağı renklendirme
 * @param {string} text - Renklendirilecek metin
 * @returns {string} - Gökkuşağı renklendirilmiş metin
 */
easycolor.rainbow = (text) => {
  const colors = [
    ANSI_CODES.red,
    ANSI_CODES.yellow,
    ANSI_CODES.green,
    ANSI_CODES.cyan,
    ANSI_CODES.blue,
    ANSI_CODES.magenta
  ];
  
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const colorIndex = i % colors.length;
    result += `${colors[colorIndex]}${text[i]}`;
  }
  
  return result + ANSI_CODES.reset;
};

/**
 * Rastgele renk
 * @param {string} text - Renklendirilecek metin
 * @returns {string} - Rastgele renklendirilmiş metin
 */
easycolor.random = (text) => {
  const colorKeys = Object.keys(ANSI_CODES).filter(k => 
    k !== 'reset' && !k.startsWith('bg') && !['bold', 'dim', 'italic', 'underline', 'blink', 'inverse', 'hidden', 'strikethrough'].includes(k)
  );
  
  const randomColor = ANSI_CODES[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
  return easycolor.colorize(text, randomColor);
};


easycolor.isSupported = () => {
  return process.env.FORCE_COLOR ||
    process.stdout.isTTY &&
    process.env.TERM !== 'dumb' &&
    process.env.NO_COLOR === undefined;
};


easycolor.disable = () => {
  Object.keys(ANSI_CODES).forEach(key => {
    ANSI_CODES[key] = '';
  });
};


easycolor.enable = () => {

  Object.assign(ANSI_CODES, {
    reset: '\x1b[0m',
    bold: '\x1b[1m',

  });
};


if (!easycolor.isSupported()) {
  easycolor.disable();
}

module.exports = easycolor;