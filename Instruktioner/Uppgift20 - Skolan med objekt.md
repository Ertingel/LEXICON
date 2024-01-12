## Skolan - Öva på att använda objekt i JS

Denna uppgift går ut på att skapa olika typer av object-literals (som vi i framtiden endast kommer att kalla för OBJEKT för enkelhetens skull). Ni ska skapa en skola, som kommer att innehålla lärare som undervisar i kurser som läses utav studenter, så lite olika objekt innehållandes olika typer av data och även funktioner för att de olika typer av objekt ska kunna interagera med varandra. Det blir en rätt lång js-fil som ni får skriva men det får ni bara acceptera. Glöm inte att alla variablerna måste ligga högst upp i filen för att de ska vara tillgänglig för all kod nedanför. Övningen är mest till för att ni ska vänja er med syntaxen och bekanta er med styrkorna med objekt! Det här blir även en naturlig förberedels för objektorienterad programmering.

1. Börja med att skapa en skola som ett objekt. Objektet ska existera innuti en variabel som ni namnger med skolans namn för att göra det simpel. Skolan ska innehålla egenskaperna: name, address, zipcode, city, students med värdet av en tom array och teachers som en tom array. Till exempel:
```js
let lexicon = {
name: "lexicon",
students: [],
teachers: [],
/*skolans övriga egenskaper*/
};
```
2. Skapa tre stycken olika ämnen, varje ämne ska vara ett objekt med en variabel motsvarande namnet på ämnet. Egenskaperna ska vara name, students som en tom array och teacher som ett tomt objekt. Till Exempel:
```js
let matematik = {/*ämnets egenskaper här*/}
```
3.  Skapa fem stycken studenter, där namnet på studenten motsvara variabeln. Egenskaperna ska vara name, age, gender och subjects som en tom array.

4.  Skapa två stycken lärare med namnet som variabel och egenskaperna name och subjects som en tom array.

5.  Skriv en kodrad där du lägger till ett ämne i en lärares ämnesarray. *push()* eller *unshift()* Kommer du ihåg skillnaden på dem två? Skriv sen ut både läraren och ämnet du valde i konsolen och inspektera dem. Resonera, hur kan man använda den datan ur ett admins perspektiv på en skola, och tycker du den är komplett? Vad saknas?

6.  Lägg till en student i ett ämnes studentarray. Skriv ut och inspektera i konsolen.

7. För att lösa problematiken i de två senaste uppgifterna så bör man i sådana här fall lägga till kopplingen i båda objekten. Alltså vi börjar med att lägga till ett ämne i en lärarens ämnesarray, och sen byter vi ut det tomma lärarobjekten i ämnet mot läraren. Då har vi en referens på båda sidorna. **Egentligen är detta något som kallas för en cirkulär referens vilket vi helst vill undvika när vi programmerar, då kan orsaka krashar i vissa fall, men i syftet för uppgiften så är det ingen fara.** Skapa nu en funktion som heter *addSubjectToTeacher* som tar emot ett ämne och en lärare, och parar ihop dessa. Returnera sen läraren så du kan se förändringen i lärarens ämnesarray.

8. Varför ha en fristående funktion som lägger till ämne till en lärare? Varför inte bara lägga till en funktion (alltså en metod eftersom funktionen då är kopplad till ett specifikt objekt) i lärarnas objekt som en egenskap? Till exempel: 

```js
// Två sätt, antingen går du in i varje lärarobjekt och lägger till en egenskap:
let niklas = {
    name: "niklas",
    subjects: [],
    addSubject: function(subject) {/*Logiken här*/}
}

// Tänk på att "this" måste användas för att referera till det egna objektets egenskaper.

// Andra sättet är att helt enkelt lägga till en egenskap med hjälp av punktnotation:
niklas.addSubject = function(subject) {/*Logiken här*/};

// Då kan vi ju sen kalla på denna metod via lärarobjektet.
niklas.addSubject(Matematik);

// Prova det i konsolen!
```

9. Skapa följande metoder (Någon eller ett par av metoderna kan förekomma flera gånger fast på olika objekt med olika logik) och lägg in de i rätt typ av objekt: *addTeacher*, *enlistToSubject*, *addStudent*, *addSubject*

10. Prova att leka runt med alla de skapade metoderna i konsolen och försöka lägga till i de olika objekten. Skriv ut objekten hela tiden och inspektera dem. Kan du tänka dig någon likhet med ett riktigt adminprogram för en skola där en admin till exempel skriver ut en lista på alla ämnen för att se vilka respektive lärare som är ansvariga för respektive kurs. 

11. Skapa fler metoder, *quitSubject*, *removeTeacher*, *relegateStudent*, *fireTeacher*. I vilka objekt hör dessa metoder hemma? Och om vi till exempel sparkar en lärare, så måste vi ju ta bort lärarens koppling med skolan, och ämnet/ämnerna som läraren undervisar i. Hur löser vi detta i våra metoder, nu får vi börja tänka oss för lite.

12. Lek runt med dessa metoder i konsolen. Lägg till lite här och ta bort lite där. Rätt smidigt va?

13. Ny bygger vi på det lite. För att undvika att behöva anropa massa metoder i konsolen när vi startar om programmet (vilket händer vid varje redigering av script-filen) så kan vi längst ner i script-filen skapa (alltså den koden läses in sist hela tiden) logik för att koppla några studenter till skolan, några ämnen till studenterna och några lärare till ämnena och så vidare. Skapa sån logik nu.

14. Skapa en funktion (OBS, en fristående funktion) , *displayAllStudents* som loopar igenom skolans alla studenter med hjälp av en for-loop. Tänk på att en vanlig for..of loop inte fungerar här (varför är det så?). Vi måste använda en for..IN loop, och en for..in loop låter oss loopa igenom ett objekts egenskaper (även kallad nycklar, *keys*) och på så sätt kunna koppa åt alla egenskaperna värde. Syntax:

```js
for(keys in medieinstitutet.students) {/*logik för att printa ut studenterna*/};
```

[Länk, for-loops w3schools](https://www.w3schools.com/js/js_loop_for.asp)

[Länk om for..in loops specifikt.](https://www.programiz.com/javascript/for-in)

15. Skapa nu fler funktioner, *displayAllSubjectsOfStudent(student)*, *displayAllStudentsEnlistedToSubject(subject)*, *displayAllTeachers*. Varje funktion bör ha något returvärde. 

16. Bygg ut med ett ytterligare typ av objekt, lägg till objekt som handlar om betyg. Vilka egenskaper ska dessa ha? Vilka metoder kan behövas i dessa betygsobjekt? Hur ska relationen mellan de andra objekten vara? Vilka metoder bör finnas i de andra typerna av objekt som behandlar betyg? Försöka lösa detta och inspektera och lek runt med det i konsolen.