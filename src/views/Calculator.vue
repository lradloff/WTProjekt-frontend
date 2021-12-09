<template>
  <div v-for="rechnung in rechnungen" :key="rechnung.id">
    <ul class="list-group">
      <li class="list-group-item">ID: {{ rechnung.id }} | {{ rechnung.rechnung }} |
        {{ rechnung.datum }}</li>
    </ul>
  </div>
</template>

<!--<template>-->
<!--  <ul class="list-group">-->

<!--    <div class="list-group" v-for="rechnung in rechnungen" :key="rechnung.id">-->
<!--      <li class="list-group-item">{{ rechnung.rechnung }}</li>-->
<!--    </div>-->

<!--  </ul>-->
<!--</template>-->

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      rechnungen: [],
    };
  },
  mounted() {
    const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/rechnungen`;
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(endpoint, requestOptions)
      .then((response) => response.json())
      .then((result) => result.forEach((rechnung) => {
        this.rechnungen.push(rechnung);
      }))
      .catch((error) => console.log('error', error));
  },
};
</script>

<style scoped>

</style>
