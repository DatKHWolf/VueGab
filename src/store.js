import { calendarWeekData } from "./seed.js";
import { reactive, readonly } from "vue";
const state = reactive({
  calendarWeekData,
});

const getters = {
  activeDay: () => state.calendarWeekData.find((day) => day.active),
};

const mutations = {
  addEvent(eventObj) {
    const activeDay = getters.activeDay();
    activeDay.events.push({
      title: eventObj.title,
      edit: false,
      color: eventObj.color,
      priority: Number(eventObj.priority),
    });
  },
  deleteEvent(dayId, eventTitle) {
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventIndex = dayObj.events.find(
      (event) => event.title === eventTitle
    );
    dayObj.events.splice(eventIndex, 1);
  },
  editEvent(dayId, eventTitle) {
    // Alle edit-Attribute auf false setzen damit immer nur ein Event bearbeitet werden kann
    state.calendarWeekData.map((dayObj) => {
      dayObj.events.map((event) => (event.edit = false));
    });
    // Setze das entsprechende edit-Attribute auf true
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find((event) => event.title === eventTitle);
    eventObj.edit = true;
  },
  updateEvent(dayId, oldEventTitle, newEvent) {
    newEvent.title = newEvent.title !== "" ? newEvent.title : oldEventTitle;
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find(
      (event) => event.title === oldEventTitle
    );
    eventObj.title = newEvent.title;
    eventObj.priority = Number(newEvent.priority);
    eventObj.edit = false;
  },
  setActiveDay(dayId) {
    state.calendarWeekData.map((dayObj) => {
      dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false);
    });
  },
};

export default {
  state: readonly(state),
  getters,
  mutations,
};