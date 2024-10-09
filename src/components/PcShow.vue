<template>
    <div class="card border-start" :class="cardClasses">
        <div class="card-header text-center"
        :class="pcHeaderClasses"
        role="button"
        @click="showActivePc()"
        >
    <strong>{{ pc.id }}</strong>
    </div>
    <div class="card-body">
        <!-- hier muss die Pckomponente rein -->
         <PcKomponenten
            v-for="komponente in pc.list"
            :key="komponente.id"
            :event="komponente"
            >
        </PcKomponenten>
    </div>
    </div>
</template>
<script>
import Store from "../store";

export default {
    name: "PcShow",
    components:{

    }
}
</script>