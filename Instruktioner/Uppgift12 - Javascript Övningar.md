# Javascript Övningar

## Övningar

1.  Declare a variable age and assign your age to it. Write it out in the console together with a description of the age. Like, "this is my age...".
2.  Declare three variables using the three different keywords that we have learned. Write them all out in the console. What was the different between these keywords?
3.  Declare three different variables, one of each data type. Assign them values and log them to the console in three different logs.
4.  Create a const variabel called name and assign a value to it. Log it to the console. On a new line, try to reassign the value. Log that to the console. Does it work? If it doesn't, think about why that is. How would you correct it?
5.  Think about one case when we would like to use a boolean value. Discuss it with another person.
6.  If we create a variable that we know is not going to change its value during the duration of our program, should we declare it using let or const and why?
7.  Create two numbers, save them in the variables number1 and number2. Add these two variabels together and save the result in a new variable that you log to the console.
8.  Reuse the number1 and number2 variables and create three new variables:
    -   result1 should contain the difference (subtraction) between the numbers
    -   result2 should contain the product (multiplication) of the two numbers
    -   result3 should contain the quotient (division) of the two numbers
    -   Log them all to the console.
9.  Create a variable a and assign it a value. Log it to the console. Now add 5 to a by reassigning the value of a by using the existing a and the number 5. Log it to the console.
10. What is the value of a in the console.log?

## Enkel dataregistrering och miniräknare

**Mål:** Skapa ett program som loggar användarens input och gör några grundläggande beräkningar i konsolen.

**Syfte:** Förstå variabler, operatorer och grundläggande funktioner i JavaScript

1.  Använd prompt för att fråga användaren efter deras namn. Spara detta i en variabel och använd console.log för att visa ett hälsningsmeddelande som inkluderar deras namn.
2.  Använd prompt för att fråga användaren efter deras födelseår. Spara detta i en variabel.
3.  Beräkna användarens ålder genom att subtrahera födelseåret från det aktuella året. Du kan få det aktuella året med new Date().getFullYear() eller bara hårdkoda in det. Spara resultatet i en variabel och använd console.log för att visa ett meddelande som inkluderar deras ålder.
4.  Använd prompt för att fråga användaren efter två nummer. Spara dem i variabler.
5.  Använd operatorerna +, -, \*, och / för att utföra addition, subtraktion, multiplikation och division på dessa nummer. Använd console.log för att visa resultaten av dessa operationer.

_Tänk på att prompt **ALLTID** returnerar en sträng. Vill ni ha det som ett nummer så måste ni konvertera det till ett nummer . Det gör ni med hjälp av "parseInt()". Ni använder det genom att skriva så här: const number = parseInt(someStringThatLooksLikeANumber)._

6.  Använd alert för att meddela användaren att beräkningarna är klara och att de kan kontrollera konsolen för resultaten.

**Observera:** vi har ingen felhantering i detta program så var noga med att skriva rätt värden annars kan det bli tokigt.

## Miniräknare

Okej, nu är det dags att programmera en ordentlig, fast enkel miniräknare i JavaScript. Nedan kommer instruktionerna. Ni behöver som alltid en index.html och en index.js som måste vara ihopkopplade.

1.  Skapa en prompt som frågar om ett valfritt tal. Spara undan i en variabel.
2.  Skapa en prompt till som frågar om ett annat tal. Spara i en variabel.
3.  Skapa ny en tredje prompt som frågar vilket räknesätt användare vill använda. Det bör framgå att endast +, -, \* och / är möjliga. Denna ska också sparas i en variabel.
4.  Skapa en if-else-if check där du checkar de olika alternativen. Till exempel. Om räknesättet är lika med addition, så ska en addition utföras mellan de två talen och en alert ska poppa upp och redovisa resultatet. Är det subtraktion som gäller så ska subtraktion ske mellan talen och så vidare.
5.  Inkludera en else i slutet som hanterar alla utfall, om till exempel räknesättet skrivs in fel så det inte känns igen eller liknande.
6.  Lägga gärna till lite skjyssta alerts innan och efter som hälsar en välkommen och säger hejdå och så.
