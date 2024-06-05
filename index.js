function add(input) {
  if (input === "") {
    return 0;
  }

  const { delimiter, numbers } = parseInput(input);
  const numbersArray = splitNumbers(numbers, delimiter);
  const { sum, negativeNumbers } = calculateSum(numbersArray);

  if (negativeNumbers.length > 0) {
    throw new Error("Negatives not allowed: " + negativeNumbers.join(", "));
  }

  return sum;
}

function parseInput(input) {
  let delimiter = /,|\n/;
  let numbers = input;

  if (input.startsWith("//")) {
    const delimiterEndIndex = input.indexOf("\n");
    delimiter = input.substring(2, delimiterEndIndex);
    numbers = input.substring(delimiterEndIndex + 1);
    delimiter = escapeSpecialCharacters(delimiter);
  }

  delimiter = new RegExp(delimiter);
  return { delimiter, numbers };
}

function escapeSpecialCharacters(delimiter) {
  return delimiter
    .split("")
    .map((char) => "\\" + char)
    .join("");
}

function splitNumbers(numbers, delimiter) {
  return numbers.split(delimiter);
}

function calculateSum(numbersArray) {
  let sum = 0;
  const negativeNumbers = [];

  for (const num of numbersArray) {
    const number = parseInt(num, 10);

    if (isNaN(number)) {
      continue;
    }
    if (number < 0) {
      negativeNumbers.push(number);
    }
    sum += number;
  }

  return { sum, negativeNumbers };
}

// Testing the function
try {
  console.log(add("")); // 0
  console.log(add("1")); // 1
  console.log(add("1,5")); // 6
  console.log(add("1\n2,3")); // 6
  console.log(add("//;\n1;2")); // 3
  console.log(add("1,5,5,75")); // 86
  console.log(add("-1,2,-3")); // throws error: negative numbers not allowed -1,-3
} catch (e) {
  console.log(e);
}

// Export the function for testing
module.exports = add;
