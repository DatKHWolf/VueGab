<template>
  <div id="calender-entry">
    <div class="card">
      <div class="card-header text-center">
        <h5>
          Neuer Termin für: <strong>{{ activeDayName }}</strong>
        </h5>
      </div>
      <div class="card-body">
        <div class="alert alert-danger" v-if="error">der Titel darf nicht leer sein</div>
        <input type="text" class="form-control" placeholder="Neuer Eintrag" v-model="event.title" @keyup.enter="addEvent()" />
        <select class="form-select mt-2" v-model="event.priority">
          <option value="-1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="1">Tief</option>
        </select>
        <div class="text-center mt-3">
          <span
            v-for="color in eventColors"
            :key="color"
            class="d-inline-block alert m-0 me-2 square"
            role="button"
            :class="eventColorClasses(color)"
            @click="setEventColor(color)"
          >
          </span>
        </div>
        <hr />
        <div class="d-grid gap-2">
          <button class="btn btn-primary" @click="addEvent()" :disabled="submitButtonEventStatus">Eintragen</button>
          <button class="btn btn-danger" @click="removeEvent()">Inhalt löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from "../store.js";
export default {
  name: "CalenderEntry",
  data() {
    return {
      error : false,
      eventColors: ["primary", "success", "info", "warning", "danger"],
      event: {
        title: "",
        color: "primary",
        priority: 0,
      },
    };
  },
  computed: {
    activeDayName() {
      return Store.getters.activeDay().fullName;
    },
    submitButtonEventStatus(){
      return this.event.title === "";
    }
  },
  methods: {
    eventColorClasses(eventColor) {
      return [
        "alert-" + eventColor,
        this.event.color === eventColor
          ? "border border-" + this.event.color
          : "",
      ];
    },
    removeEvent(){
      this.event =     {
        title: "",
        color: "primary",
        priority: 0,
      }
    },
    setEventColor(eventColor) {
      this.event.color = eventColor;
    },
    addEvent(){
      if(this.event.title==="") return (this.error = true)
      Store.mutations.addEvent(this.event);
      this.event = {
        title: "",
        color: "primary",
        priority: 0,
      }
      this.error=false;
    }
  },
};
</script>

<style scoped></style>
