import {SchedulingTimelineCard} from "./SchedulingTimelineCard.js";
import {getGlobalAppointments} from "../setAndGetGlobalVariables.js";

function SchedulingTimelineDiv(month, year) {
	const cardReferences = [];

	const schedulingTimelineContainer = document.createElement("div");
	schedulingTimelineContainer.classList.add("schedulingTimelineMain");

	const appointments = getGlobalAppointments();

	const days = ["D", "S", "T", "Q", "Q", "S", "S"];

	for (let i = 0; i < days.length; i++) {
		const schedulingTimelineDivHeader = SchedulingTimelineCard(
			false,
			"",
			days[i],
			"transparent",
			"30px",
			"80px"
		);
		schedulingTimelineDivHeader.classList.add("schedulingTimelineMainHeader");
		schedulingTimelineContainer.appendChild(schedulingTimelineDivHeader);
	}

	const getDaysInMonth = new Date(year, month + 1, 0).getUTCDate();

	const monthStartDate = new Date(year, month, 1);
	const monthStartDay = monthStartDate.getUTCDay();

	for (let j = 0; j < monthStartDay; j++) {
		const schedulingTimelineCard = SchedulingTimelineCard(
			false,
			"",
			"",
			"transparent",
			"70px",
			"70px"
		);
		schedulingTimelineCard.classList.add("invisible");
		schedulingTimelineContainer.appendChild(schedulingTimelineCard);
	}

	ColorCardAppointments(
		getDaysInMonth,
		year,
		month,
		schedulingTimelineContainer,
		cardReferences,
		appointments
	);

	return schedulingTimelineContainer;
}

async function GenerateCards(
	getDaysInMonth,
	year,
	month,
	schedulingTimelineContainer,
	cardReferences
) {
	for (let k = 0; k < getDaysInMonth; k++) {
		const date = new Date(year, month, k + 1);
		const schedulingTimelineCard = SchedulingTimelineCard(
			true,
			date.toISOString(),
			k + 1,
			null,
			"70px",
			"70px"
		);
		schedulingTimelineCard.classList.add("schedulingTimelineMainCard");
		schedulingTimelineCard.classList.add(`Card-${k}-${month}-${year}`);
		schedulingTimelineContainer.appendChild(schedulingTimelineCard);

		cardReferences.push({
			date: date.toLocaleString("pt-BR"),
			selector: `Card-${k}-${month}-${year}`
		});
	}
}

async function ColorCardAppointments(
	getDaysInMonth,
	year,
	month,
	schedulingTimelineContainer,
	cardReferences,
	appointments
) {
  await GenerateCards(
    getDaysInMonth,
    year,
    month,
    schedulingTimelineContainer,
    cardReferences
  );
    const today = new Date().getDate() -1
    const todayMonth = new Date().getMonth()
    const todayYear = new Date().getFullYear()
    const todayCard = `Card-${today}-${todayMonth}-${todayYear}`
    
    cardReferences.forEach((card) => {
      if (card.selector === todayCard) {
        const cardElement = document.querySelector(`.${card.selector}`);
        if (cardElement) {
          cardElement.classList.add("todayCard");
        }
      }
    });

	cardReferences.forEach(({date, selector}) => {
		const foundPendindgAppointments = appointments.filter(
			appointment => appointment.status === "AGENDADO"
		);

		const foundBlockedAppointments = appointments.filter(
			appointment => appointment.status === "BLOQUEADO"
		);

		const classNames = getCardClassesForAppointments(foundBlockedAppointments);
		const foundElements = [];

		const foundPendingElements = [];
		const pendingClassName = getPendentAppointment(foundPendindgAppointments);

		pendingClassName.forEach(className => {
			const elements = [...document.querySelectorAll(`.${className}`)];
			foundPendingElements.push(...elements);
		});

		classNames.forEach(classNameArray => {
			classNameArray.classes.forEach(className => {
				const elements = [...document.querySelectorAll(`.${className}`)];
				foundElements.push(...elements);
			});
		});

		if (foundBlockedAppointments.length > 0) {
			foundElements.forEach(element => {
				if (element) {
					element.classList.add("SchedulingTimelineCardBlocked");
				}
			});
		}
		if (foundPendindgAppointments.length > 0) {
			foundPendingElements.forEach(element => {
				if (element) {
					element.classList.add("SchedulingTimelineCardPending");
				}
			});
		}
	});
}

const getCardClassesForAppointments = function (appointments) {
	const result = [];

	appointments.forEach(({appointmentStart, appointmentEnd}) => {
		const [startDate, startTime] = appointmentStart.split(", ");
		const [endDate, endTime] = appointmentEnd.split(", ");

		const [startDay, startMonth, startYear] = startDate.split("/");
		const [endDay, endMonth, endYear] = endDate.split("/");

    const start = new Date(
      `${startYear}-${startMonth}-${startDay}T${startTime}`
    );

    const end = new Date(`${endYear}-${endMonth}-${endDay}T${endTime}`);
    const classesArray = [];

		for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
			const dayIndex = dt.getDate() - 1;
			const monthIndex = dt.getMonth();
			const yearIndex = dt.getFullYear();
			classesArray.push(`Card-${dayIndex}-${monthIndex}-${yearIndex}`);
		}

		result.push({
			appointmentStart,
			appointmentEnd,
			classes: classesArray
		});
	});
	return result;
};

function getPendentAppointment(foundPendindgAppointments) {
	const classesArray = [];
	foundPendindgAppointments.forEach(({appointmentStart}) => {
		const [startDate, startTime] = appointmentStart.split(", ");
		const [startDay, startMonth, startYear] = startDate.split("/");
		const className = `Card-${
			new Date(
				`${startYear}-${startMonth}-${startDay}T${startTime}`
			).getDate() - 1
		}-${startMonth - 1}-${startYear}`;
		classesArray.push(className);
	});

	return classesArray;
}

export {SchedulingTimelineDiv};
