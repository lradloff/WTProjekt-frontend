<template>
  <div class="about container-fluid" style="background: #A696EC">
    <h1 style="text-align: center">
      Über diesen Taschenrechner
      <h3 style="margin-top: 100px">
        Dies ist ein einfacher Taschenrechner. Es lassen sich Rechnungen mithilfe der vier
        Grundrechenarten durchführen, wobei der komplette Rechenweg auf dem Display angezeigt wird.
        Nach einer Berechnung wird diese in der Historie gespeichert, ist einsehbar und kann
        angeklickt werden, um diese Rechnung in den Taschenrechner zu übernehmen und mit dieser
        weiterzurechnen. Diese Historie kann aktualisiert und vollständig gelöscht werden.
      </h3>
      <h3 style="margin-top: 100px">
        Zusätzliche Funktionen sind mit den Knöpfen '⌫', 'ans', 'var' möglich: '⌫' entfernt die
        zuletzt eingegebene Ziffer der aktuell eingegebenen Zahl, 'ans' beinhaltet das Ergebnis der
        letzten Rechnung und 'var' speichert einen Wert in eine auswählbare Variable, mit der
        anschließend gerechnet werden kann.
      </h3>
      <h3 style="margin-top: 100px">
        Gestaltet wurde dieser Taschenrechner in einem leichten und angenehmen Lavendelfarbenen
        Theme, um dem Nutzer auch lange Sitzungen zu gewährleisten und ihm generell eine positive
        Erfahrung zu bieten.
      </h3>
    </h1>
  </div>
</template>

<style scoped>
.container-fluid {
  user-select: none;
  height: calc(100vh - 56px);
}
</style>
