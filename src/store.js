import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";
import { pcListe } from "./pc";

const state = reactive({
  calendarWeekData,
  pcListe,
  activeView: "CalendarWeek",
});

const getters = {
  activeDay: () => state.calendarWeekData.find((day) => day.active),
  activeView: () => state.activeView,
};

const mutations = {
  setActiveDay(dayId) {
    state.calendarWeekData.map((dayObj) => {
      dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false);
    });
  },
  setActiveView(view) {
    state.activeView = view;
  },
  storeEvent(eventDO) {
    const activeDay = getters.activeDay();
    activeDay.events.push({
      title: eventDO.title,
      edit: false,
      color: eventDO.color,
      priority: Number(eventDO.priority),
    });
  },
  storePc(pc){
    const Pc =     {
      id:pc.id,
      hersteller:pc.hersteller,
      geraetenummer:pc.geraetenummer,
      prozessor:pc.prozessor,
      betriebssystem:pc.betriebssystem,
      ram :pc.ram,
      festplatte:{typ:pc.festplatte.typ, size:pc.festplatte.size},
      benchmark:pc.benchmark,
      funktion:pc.funktion,
      benutzername:pc.benutzername,
      passwort:pc.passwort,
      aufLager:false,
      bermerkungen:"",
      //Datefunktion bauen
      endkontrolle:"16.02.2024", 
    }
    console.log(Pc)
    //speichern in der "Datenbank"
  },
  editEvent(dayId, eventTitle) {
    // Alle edit-Attribute auf false setzen, damit immer nur ein Event bearbeitet werden kann
    state.calendarWeekData.map((dayObj) => {
      dayObj.events.map((event) => (event.edit = false));
    });
    // Setze das entsprechende edit-Attribut auf trie
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
  deleteEvent(dayId, eventTitle) {
    const dayObj = state.calendarWeekData.find((day) => day.id === dayId);
    const eventIndex = dayObj.events.findIndex(
      (event) => event.title === eventTitle
    );
    dayObj.events.splice(eventIndex, 1);
  },
};

export default {
  state: readonly(state),
  getters,
  mutations,
};
