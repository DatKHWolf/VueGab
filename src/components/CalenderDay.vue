<template>
  <div class="card border-start" :class="cardClasses">
    <div id="calendar-day">
      <div
        class="card-header text-center"
        role="button"
        :class="cardHeaderClasses"
        @click="setActiveDay()"
      >
        <strong>{{ day.fullName }}</strong>
      </div>
      <CalenderEvent
        v-for="event in day.events"
        :key="event.title"
        :event="event"
        :day="day"
      >
        <template v-slot:eventPriority="slotProps">
          <h5>{{ slotProps.priorityDisplayName }}</h5>
        </template>
        <template v-slot="eventData"
          ><i>{{ eventData.event.title }}</i></template
        >
      </CalenderEvent>
    </div>
  </div>
</template>

<script>
import CalenderEvent from "./CalenderEvent.vue";
import Store from "../store";
export default {
  name: "CalenderDay",
  components: {
    CalenderEvent,
  },
  props: {
    day: {
      type: Object,
      required: true,
      default: function () {
        return {
          id: "-1",
          day: "Props nicht gefunden, binding in CalenderWeek vermutlich falsch",
          events: [],
        };
      },
    },
    validator: function (value) {
      if (Object.keys(value).includes("id")) {
        return true;
      }
    },
  },
  computed: {
    cardClasses() {
      return this.day.id === Store.getters.activeDay().id
        ? ["border-primary"]
        : null;
    },
    cardHeaderClasses() {
      return this.day.id === Store.getters.activeDay().id
        ? ["bg-danger", "text-white"]
        : null;
    },
  },
  methods:{
    setActiveDay(){
      Store.mutations.setActiveDay(this.day.id)
    }
  }
};
</script>

<style scoped></style>
