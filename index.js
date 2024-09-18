#!/usr/bin/env node

const { execSync } = require("child_process");

/**
 * Print the help message
 */

function printHelpMessage() {
  console.log(`
Usage: password-generator [options]

Options:
  --length [number]        Set the length of the password (default: 8)
  --numbers                Include numbers in the password
  --uppercase              Include uppercase letters in the password
  --symbols                Include symbols in the password
  --help                   Display this help message

Example:
  password-generator --length 12 --numbers --uppercase --symbols  
  `);
}

/**
 * Generates a password based on the provided options
 * @param {number} length - The length of the password
 * @param {boolean} includeNumbers - Whether to include numbers
 * @param {boolean} includeUppercase - Whether to include uppercase letters
 * * @param {boolean} includeSymbols - Whether to include symbols
 * @returns {string} - The generated password
 */

function generatePassword(
  length,
  includeNumbers,
  includeUppercase,
  includeSymbols
) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let characters = lowercase;
  if (includeNumbers) characters += numbers;
  if (includeUppercase) characters += uppercase;
  if (includeSymbols) characters += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

/**
 * Main function that generates the password based on the options provided
 * @returns {void}
 */

function passwordGenerator() {
  const args = process.argv.slice(2);
  let length = 8;
  let includeNumbers = false;
  let includeUppercase = false;
  let includeSymbols = false;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--help":
        printHelpMessage();
        return;
      case "--length":
        length = parseInt(args[i + 1], 10);
        if (isNaN(length) || length <= 0) {
          console.error("Invalid length specified.");
          return;
        }
        i++;
        break;
      case "--numbers":
        includeNumbers = true;
        break;
      case "--uppercase":
        includeUppercase = true;
        break;
      case "--symbols":
        includeSymbols = true;
        break;
      default:
        console.error(`Unknown option: ${args[i]}`);
        return;
    }
  }

  const password = generatePassword(
    length,
    includeNumbers,
    includeUppercase,
    includeSymbols
  );
  console.log(`Generated Password: ${password}`);
}

passwordGenerator();
