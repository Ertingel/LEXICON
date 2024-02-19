## Skolan - Öva på att använda klasser i JS

Denna uppgift går ut på att skapa olika typer av klasser. Ni ska skapa en skola, som kommer att innehålla lärare som undervisar i kurser som läses utav studenter, så lite olika klasser innehållandes olika typer av data och även funktioner för att de olika typer av klasserna ska kunna interagera med varandra. Det blir en rätt lång js-fil som ni får skriva men det får ni bara acceptera. Man kan även dela upp koden i olika filer, en klass per fil till exempel men då får man se till att alla JS-filer importeras in i rätt ordning i er HTML-fil. Övningen är till för att ni ska lära er klass-syntaxen och bekanta er med styrkorna med att använda klasser! Användning av klasser är det som oftst kallas för objektorienterad programmering.

1. Börja med att skapa en skola som en klass. Klassen ska döpas till just `School`. Klassen ska innehålla följande instansvariabler: name, address, zipcode, city, students med värdet av en tom array och teachers som en tom array.

```js
class School {
  constructor(name) {
    this.name = name;
    this.students = [];
    this.teachers = [];
    /* skolans övriga egenskaper */
  }
}
```

2. Skapa en klass för ämnen. Instansvariabler ska vara name, students som en tom array och teacher som ett tomt objekt. _Väldigt likt klassen av en skola men det ska representera att vissa elever läser vissa ämene och att vissa lärare undervisar vissa ämnen._

```js
class Subject {
    /* koden...*/
  }
}
```

3.  Skapa en klass för studenter, instansvariablerna ska vara name, age, gender och subjects som en tom array.

4.  Skapa en klass lärare med instansvariablerna name och subjects som en tom array.

5.  Skapa en instans av skola, tre instanser av ämne, fem instanser av student samt två instanster av lärare. Var lite kreaktiva med namngivningen nu på de olika instansvariablerna.

6.  Skriv en kodrad där du lägger till ett ämne i en lärares ämnesarray. _push()_ eller _unshift()_ Kommer du ihåg skillnaden på dem två? Skriv sen ut både läraren och ämnet du valde i konsolen och inspektera dem. Resonera, hur kan man använda den datan ur ett admins perspektiv på en skola, och tycker du den är komplett? Vad saknas?

7.  Lägg till en student i ett ämnes studentarray. Skriv ut och inspektera i konsolen.

8.  För att lösa problematiken i de två senaste uppgifterna så bör man i sådana här fall lägga till kopplingen i båda objekten. Alltså vi börjar med att lägga till ett ämne i en lärarens ämnesarray, och sen byter vi ut det tomma lärarobjekten i ämnet mot läraren. Då har vi en referens på båda sidorna. **Egentligen är detta något som kallas för en cirkulär referens vilket vi helst vill undvika när vi programmerar, då kan orsaka krashar i vissa fall, men i syftet för uppgiften så är det ingen fara.** Skapa nu en funktion som heter _addSubjectToTeacher_ som tar emot ett ämne och en lärare, och parar ihop dessa. Returnera sen läraren så du kan se förändringen i lärarens ämnesarray.

9.  Varför ha en fristående funktion som lägger till ämne till en lärare? Varför inte bara lägga till en funktion (alltså en metod eftersom funktionen då är kopplad till en specifik klass) i klassen `Teacher` som en metod? Tänkt på att `this` måste användas när man refererar till en något i den egna klassen.

10. Skapa följande metoder (Någon eller ett par av metoderna kan förekomma flera gånger fast på olika klasser med olika logik) och lägg in de i rätt klass: _addTeacher_, _enlistToSubject_, _addStudent_, _addSubject_

11. Prova att leka runt med alla de skapade metoderna i konsolen och försöka lägga till i de olika instanserna. Skriv ut instansen hela tiden och inspektera dem. Kan du tänka dig någon likhet med ett riktigt adminprogram för en skola där en admin till exempel skriver ut en lista på alla ämnen för att se vilka respektive lärare som är ansvariga för respektive kurs.

12. Skapa fler metoder, _quitSubject_, _removeTeacher_, _relegateStudent_, _fireTeacher_. I vilka klasser hör dessa metoder hemma? Och om vi till exempel sparkar en lärare, så måste vi ju ta bort lärarens koppling med skolan, och ämnet/ämnerna som läraren undervisar i. Hur löser vi detta i våra metoder, nu får vi börja tänka oss för lite.

13. Lek runt med dessa metoder i konsolen. Lägg till lite här och ta bort lite där, i de olika instanserna. Rätt smidigt va?

14. Ny bygger vi på det lite. För att undvika att behöva anropa massa metoder i konsolen när vi startar om programmet (vilket händer vid varje redigering av script-filen) så kan vi längst ner i script-filen skapa (alltså den koden läses in sist hela tiden) logik för att koppla några studenter till skolan, några ämnen till studenterna och några lärare till ämnena och så vidare. Skapa sån logik nu.

15. Skapa en funktion (OBS, en fristående funktion) , _displayAllStudents_ som loopar igenom skolans alla studenter med hjälp av en loop. Alla studenter med respektive egenskaper ska skrivas ut i konsolen.

16. Skapa nu fler funktioner, _displayAllSubjectsOfStudent(student)_, _displayAllStudentsEnlistedToSubject(subject)_, _displayAllTeachers_. Varje funktion bör ha något returvärde.

17. Bygg ut med ett ytterligare typ av klass, lägg till en klass som handlar om betyg. Vilka instansvariabler ska den ha? Vilka metoder kan behövas i denna klass? Hur ska relationen mellan de andra klasserna vara? Vilka metoder bör finnas i de andra klasserna som behandlar betyg? Försöka lösa detta och inspektera och lek runt med det i konsolen.
