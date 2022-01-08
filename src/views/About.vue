<template>
  <div class="about container-fluid" style="background: #A696EC">

    <div class="row">
      <h1 class="text-lg-center" style="margin-top: 20px">
        Über diesen Taschenrechner
      </h1>
    </div>

    <div class="row">

      <div class="col text-lg-center shadow py-3 px-3 rounded" style="margin-left: 50px;
      margin-top: 50px; background: #c2b3ff">
        <h3>
          Dies ist ein einfacher Taschenrechner. Es lassen sich Rechnungen mithilfe der vier
          Grundrechenarten durchführen, wobei der komplette Rechenweg auf dem Display angezeigt
          wird. Nach einer Berechnung wird diese in der Historie gespeichert, ist einsehbar und
          kann angeklickt werden, um diese Rechnung in den Taschenrechner zu übernehmen und mit
          dieser weiterzurechnen. Diese Historie kann aktualisiert und vollständig gelöscht
          werden.
        </h3>
        <h3 style="margin-top: 50px">
          Zusätzliche Funktionen sind mit den Knöpfen '⌫', 'ans', 'var' möglich: '⌫' entfernt
          die zuletzt eingegebene Ziffer der aktuell eingegebenen Zahl, 'ans' beinhaltet das
          Ergebnis der letzten Rechnung und 'var' speichert einen Wert in eine auswählbare
          Variable, mit der anschließend gerechnet werden kann.
        </h3>
        <h3 style="margin-top: 50px">
          Gestaltet wurde dieser Taschenrechner in einer leichten und angenehmen, lavendelfarbenen
          Farbgebung.
        </h3>
      </div>

      <div class="col" style="margin-top: 150px; margin-right: 50px">

        <div class = "p-3 rounded shadow" style="max-width: 400px;
        background: #C9BBFF; margin-left: 290px">

          <div class = "w-auto m-1 p-3 text-end lead fw-bold text-black bg-light-purple"
               style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
            {{ '__' }}
          </div>

          <!-- Layout inspired by https://www.youtube.com/watch?v=SLk0lfUX3PY -->
          <div class="row g-0">
            <div class="col-3" v-for="n in calculatorButtons" :key="n">
              <div class="lead text-black text-center m-1 py-3 bg-light-purple rounded"
                   :class="{'bg-dark-purple': ['AC','⌫','ans','/','*','-','+','var','=']
                   .includes(n)}">
                {{ n }}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      calculatorButtons: ['AC', '⌫', 'ans', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 'var', 0, '.', '='],
    };
  },
};
</script>

<style scoped>
.bg-light-purple {
  background: #E6DFFF;
}
.bg-dark-purple {
  background: #A696EC;
}
.container-fluid {
  user-select: none;
  height: calc(100vh - 56px);
}
</style>
