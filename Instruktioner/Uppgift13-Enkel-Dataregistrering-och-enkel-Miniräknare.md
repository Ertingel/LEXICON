## Enkel dataregistrering och miniräknare

**Mål: Skapa ett program som loggar användarens input och gör några grundläggande beräkningar i konsolen.**

**Syfte: Förstå variabler, operatorer och grundläggande funktioner i JavaScript**

1. Använd prompt för att fråga användaren efter deras namn. Spara detta i en variabel och använd console.log för att visa ett hälsningsmeddelande som inkluderar deras namn.

2. Använd prompt för att fråga användaren efter deras födelseår. Spara detta i en variabel.

3. Beräkna användarens ålder genom att subtrahera födelseåret från det aktuella året. Du kan få det aktuella året med new Date().getFullYear() eller bara hårdkoda in det. Spara resultatet i en variabel och använd console.log för att visa ett meddelande som inkluderar deras ålder.

4. Använd prompt för att fråga användaren efter två nummer. Spara dem i variabler.

5. Använd operatorerna +, -, \*, och / för att utföra addition, subtraktion, multiplikation och division på dessa nummer. Använd console.log för att visa resultaten av dessa operationer.

_Tänk på att prompt ALLTID returnerar en sträng. Vill ni ha det som ett nummer så måste ni konvertera det till ett nummer . Det gör ni med hjälp av "parseInt()". Ni använder det genom att skriva så här: `const number = parseInt(someStringThatLooksLikeANumber)`._

6. Använd alert för att meddela användaren att beräkningarna är klara och att de kan kontrollera konsolen för resultaten.

_Observera: vi har ingen felhantering i detta program så var noga med att skriva rätt värden annars kan det bli tokigt._
