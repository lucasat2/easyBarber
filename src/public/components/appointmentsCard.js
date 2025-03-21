function createAppointmentsCard(
  shouldBindDataToDiv,
  date,
  text,
  color,
  height,
  width
) {
  const appointmentsCard = document.createElement("div");
  appointmentsCard.style.display = "flex";
  appointmentsCard.style.justifyContent = "center";
  appointmentsCard.style.alignItems = "center";
  appointmentsCard.style.fontFamily = `"Fredoka", sans-serif`;
  appointmentsCard.innerText = text;
  appointmentsCard.style.height = height;
  appointmentsCard.style.width = width;
  appointmentsCard.style.backgroundColor = color;
  appointmentsCard.style.borderRadius = "10px";

  if (shouldBindDataToDiv) {
    appointmentsCard.currentDate = date;

    appointmentsCard.addEventListener("click", function () {
      console.log(this.currentDate);
    });
  }

  return appointmentsCard;
}

export { createAppointmentsCard };