const min_temp = 73
const max_temp = 77

function toCelsius(fahrenheit) {
	return ((fahrenheit - 32.0) * 5.0) / 9.0
}

let temp = 0

while (temp < min_temp || max_temp < temp) {
	temp = toCelsius(prompt("What is the temperature in fahrenheit? "))

	if (temp < min_temp)
		alert("The temperature is to low! Please raise the temperature. ")
	else if (max_temp < temp)
		alert("The temperature is to high! Please lower the temperature. ")
}

alert("The temperature is to right. Please enjoy the sauna. ")
