<template>
  <h1>Wochenplaner</h1>
  <div id="calender-week">
    <div class="card-group">
      <!-- Anfang: Template für die Calendar-Day-Component -->
      <CalenderDay v-for="day in calendarWeekData" :key="day.id" :day="day" />
      <!-- Ende: Template für die Calendar-Day-Component -->
    </div>
  </div>
</template>

<script>
import CalenderDay from "./CalenderDay.vue";
import Store from "../store";
export default {
  name: "CalenderWeek",
  components: {
    CalenderDay,
  },
  data() {
    return {
      calendarWeekData: Store.state.calendarWeekData,
    };
  },
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>
