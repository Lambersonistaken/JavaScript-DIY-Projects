const dateInput = document.getElementById("date-input");
const calculateButton = document.querySelector(".calculate-btn");
let ageText = document.getElementById("age-text");

calculateButton.addEventListener("click", function () {
  const birthDate = new Date(dateInput.value);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjusting the month/day based on whether the current month/day is less than the birth month/day
  if (days < 0) {
    // Go to the previous month
    months--;
    // Calculate the days based on the previous month's total days
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    // Go back to the previous year
    years--;
    months += 12; // Adjust the months because we've gone back a year
  }

  ageText.textContent = `You are ${years} years, ${months} months, and ${days} days old.✨`;
});
