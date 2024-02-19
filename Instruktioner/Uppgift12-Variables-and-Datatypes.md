# Simple exercises about variables, data types and operators

Here you have some exercises that you will need to solve in your VSC.

- Create a folder on your computer, open it in VSC, create an html and a javascript file and link them together. Write out **_Hello World!_** in the console.

All the following exercises, you can solve them in the same javascript file. Just don't forget to comment out stuff that you don't want to display anymore in the console.

---

### Variables

Creating variables is often called **_declaring a variable_**, and a declared variable doesn't need to have a value . It could look like this:

```js
var age;
let car;
const firstName; // We CAN'T do this with a const, they ALWAYS need a value from the start. Why is that? Keep that in mind.
```

It's easy to just give these variables a value later, it's called to **_assign_** them a value.

```js
age = 15;
car = "Audi";
```

Normally, we just do the declaration and assignment straight away,

```js
let firstName = "Niklas";
let lastName = "King-of-JavaScript";
```

---

### Logging to the console

Logging something to the browser's console is an easy thing to do.

```js
console.log("This text will end up in the console of the browser, try it out!");
```

Remember that the text inside the parantheses must be enclosed in either double quotes or single quotes.

A `console.log` can take multiple values inside the parentheses, just comma-seperate them

---

### Data types

We have learned a little but about data types in Javascript. Three of them were the following: **string**, **number** and **boolean**.

**String** is just a arbitrary collection of characters enclosed in quotation marks. **Number** is used for number, simple numbers. Can be any number really. There are some limitations to the size of the number but that's not important at this stage. You can have decimal numbers as well, just use a **period** instead of a **comma** when writing the number. Boolean are a data type that can only have the value **true** or **false** (casing is important here).

---

### Exercises

1. Declare a variable `age` and assign your age to it. Write it out in the console together with a description of the age. Like, "this is my age...".
2. Declare three variables using the three different keywords that we have learned. Write them all out in the console. What was the different between these keywords?
3. Declare three different variables, one of each data type. Assign them values and log them to the console in three different logs.
4. Create a `const` variabel called `name` and assign a value to it. Log it to the console. On a new line, try to reassign the value. Log that to the console. Does it work? If it doesn't, think about why that is. How would you correct it?
5. Think about one case when we would like to use a boolean value. Discuss it with another person.
6. If we create a variable that we know is not going to change its value during the duration of our program, should we declare it using `let` or `const` and why?
7. Create two numbers, save them in the variables `number1` and `number2`. Add these two variabels together and save the `result` in a new variable that you log to the console.
8. Reuse the `number1` and `number2` variables and create three new variables:
   - `result1` should contain the difference (subtraction) between the numbers
   - `result2` should contain the product (multiplication) of the two numbers
   - `result3` should contain the quotient (division) of the two numbers
   - Log them all to the console.
9. Create a variable `a` and assign it a value. Log it to the console. Now add 5 to `a` by reassigning the value of `a` by using the existing `a` and the number 5. Log it to the console.
10. What is the value of `a` in the console.log?

```js
let a = 10;
a = a - 4;
a = 7;
a = a + 2;

console.log(a);
```

11. Explain each line of code in the previous question for a friend.
