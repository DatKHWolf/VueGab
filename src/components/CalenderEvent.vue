<template>
  <div id="calendar-event">
    <div class="alert text-center" :class="alertColor">
      <!-- Template für den Fall dass das Event nicht bearbeitet wird-->
      <template v-if="!event.edit">
        <div>
          <!--                         <strong>{{ priorityDisplayName }}</strong> -->
          <slot
            name="event-priority"
            :priorityDisplayName="priorityDisplayName"
          >
            <div>
              <strong>{{ priorityDisplayName }}</strong>
            </div>
          </slot>
        </div>

        <!-- <div>{{ event.title }}</div>-->
        <slot :event="event"
          ><div>{{ event.title }}</div>
        </slot>

        <div>
          <i class="fas fa-edit me-2" role="button" @click="editEvent()"></i>
          <i class="far fa-trash-alt" role="button" @click="deleteEvent()"></i>
        </div>
      </template>
      <template v-else>
        <input
          type="text"
          class="form-control"
          :placeholder="event.title"
          @input="setNewEventTitle($event)"
        />
        <hr />
        <select class="form-select mt-2" v-model="newEventPriority">
          <option value="-1">Hoch</option>
          <option value="0">Mittel</option>
          <option value="1">Tief</option>
        </select>
        <i class="fas fa-check" role="button" @click="updateEvent()"></i>
      </template>
    </div>
  </div>
</template>

<script>
import Store from "../store.js";
export default {
  name: "CalenderEvent",
  props: {
    event: Object,
    day: Object,
  },
  data() {
    return {
      newEventTitle: "",
      newEventPriority: this.event.priority,
    };
  },
  computed: {
    priorityDisplayName() {
      switch (this.event.priority) {
        case 1:
          console.log('Mache ich nicht tief')
          return "Tief";

        case 0:
        console.log('Mache ich nicht mittel')
          return "Mittel";

        case -1:
        console.log('Mache ich nicht hcoch')
          return "Hoch";
      }
      return "Unbekannt weil falsches Return";
    },
    alertColor() {
      return "alert-" + this.event.color;
    },
  },
  methods: {
    deleteEvent() {
      Store.mutations.deleteEvent(this.day.id, this.event.title);
    },
    editEvent() {
      Store.mutations.editEvent(this.day.id, this.event.title);
    },
    updateEvent() {
      Store.mutations.updateEvent(this.day.id, this.event.title, {
        title: this.newEventTitle,
        priority: this.newEventPriority,
      });
    },
    setNewEventTitle(event) {
      this.newEventTitle = event.target.value;
    },
  },
};
</script>

<style scoped></style>
