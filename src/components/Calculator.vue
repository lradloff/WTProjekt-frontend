<template>

  <div class="container-fluid" style="background: #A696EC">

    <div class="row">

      <div class="col" style="margin-top: 200px">

        <div class = "p-3 rounded shadow" style="max-width: 400px;
        background: #C9BBFF; margin-left: 450px">

          <div class = "w-auto m-1 p-3 text-end lead fw-bold text-black bg-light-purple"
               style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
            {{ screen || '--' }}
          </div>

          <!-- Layout inspired by https://www.youtube.com/watch?v=SLk0lfUX3PY -->
          <div class="row g-0">
            <div class="col-3" v-for="n in calculatorButtons" :key="n">
              <div class="lead text-black text-center m-1 py-3 bg-light-purple rounded hover"
                   :class="{'bg-dark-purple': ['AC','⌫','ans','/','*','-','+','var','=']
                   .includes(n)}" @click="buttonPress(n)">
                {{ n }}
              </div>
            </div>
          </div>

        </div>

      </div>

      <div class="col-sm-1 btn-group-vertical" style="margin-top: 12px">
        <button type="button" class="btn btn-light bg-lighter-purple shadow"
                style="width: 48px; max-height: 45px" v-on:click="selectVar('a')">
          A
        </button>
        <button type="button" class="btn btn-light bg-lighter-purple shadow"
                style="width: 48px; max-height: 45px" v-on:click="selectVar('b')">
          B
        </button>
        <button type="button" class="btn btn-light bg-lighter-purple shadow"
                style="width: 48px; max-height: 45px" v-on:click="selectVar('c')">
          C
        </button>
        <button type="button" class="btn btn-light bg-lighter-purple shadow"
                style="width: 48px; max-height: 45px" v-on:click="selectVar('d')">
          D
        </button>
        <button type="button" class="btn btn-light bg-lighter-purple shadow"
                style="width: 48px; max-height: 45px" v-on:click="selectVar('e')">
          E
        </button>
        <button type="button" class="btn btn-light shadow bg-light-coral"
                style="width: 48px; max-height: 45px"
                v-on:click="deleteVars()">
          🗑
        </button>

      </div>

      <div class = "col" style="margin-top: 160px">

        <button type="button" class="btn border-dark btn-light bg-light-green" style="height: 40px;
        width: 50px; font-size: large; margin-left: 600px"
                v-on:click="updateHistory()">
          ↻
        </button>
        <button type="button" class="btn border-dark btn-light bg-light-coral" style="height: 40px;
         width: 50px"
                v-on:click="deleteHistory()">
          🗑
        </button>
        <div class="bg-light-purple rounded shadow" style="width: 700px; height: 452px">
          <ul class="list-group rounded" style="max-width: 700px; margin-bottom: 100px;">
            <li class="list-group-item hover" v-for="rechnung in rechnungen"
                :key="rechnung.id"
                v-on:click="selectCalc(rechnung.id)">
              ID: {{ rechnung.id }} ▎ {{ rechnung.rechnung }} = {{ rechnung.ergebnis }}
              ▎ {{ rechnung.datum }}
            </li>
          </ul>
        </div>

      </div>

    </div>

  </div>

</template>

<script>

export default {
  name: 'Calculator',

  mounted() {
    this.updateHistory();
  },

  data() {
    return {
      rechnungen: [],

      screen: '',
      currentValue: '',
      prevValue: '',
      latestOperation: null,
      latestButton: '',
      equalsPressed: true,
      dotPressed: false,
      rechenString: '',
      selectCalcPressed: false,
      prevResult: '',
      varPressed: false,
      selectVarPressed: false,
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',

      calculatorButtons: ['AC', '⌫', 'ans', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 'var', 0, '.', '='],
    };
  },

  methods: {

    deleteVars() {
      this.a = '';
      this.b = '';
      this.c = '';
      this.d = '';
      this.e = '';
    },

    selectVar(n) {
      if (this.varPressed) {
        switch (n) {
          case 'a':
            this.a = this.prevResult;
            break;
          default:
            break;
        }
        this.varPressed = false;
        this.clear();
      } else if (!this.selectVarPressed && !([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 'a', 'b', 'c', 'd',
        'e', 'ans'].includes(this.latestButton))) {
        if (this.equalsPressed) {
          this.clear();
        }
        switch (n) {
          case 'a':
            this.currentValue = this.a;
            this.screen += 'a';
            this.latestButton = n;
            break;
          default:
            break;
        }
        this.selectVarPressed = true;
        this.equalsPressed = false;
      }
    },

    selectCalc(dbid) {
      this.selectCalcPressed = true;
      const index = this.rechnungen.findIndex((element) => element.id === dbid);
      this.clear();
      this.screen = this.rechnungen[index].rechnung;
      this.prevValue = this.rechnungen[index].ergebnis;
      this.currentValue = this.rechnungen[index].ergebnis;
    },

    buttonPress(n) {
      if (n === 'AC') {
        this.clear();
        return;
      }

      if (n === 'var') {
        if (this.equalsPressed && !(this.screen === '')) {
          this.screen = 'Variable auswählen -->';
          this.varPressed = true;
        }
      }

      if (n === '⌫') {
        if (this.screen.length === 1 || this.equalsPressed) {
          this.clear();
          return;
        }
        if (!(['+', '-', '*', '/'].includes(this.screen.slice(-1)))) {
          if (this.latestButton === 'ans') {
            this.screen = this.screen.substring(0, this.screen.length - 2);
            this.currentValue = '';
            this.latestButton = '';
          }
          if (this.latestButton === '.') {
            this.dotPressed = false;
          }
          if (['a', 'b', 'c', 'd', 'e'].includes(this.screen.slice(-1))) {
            this.selectVarPressed = false;
            this.currentValue = '';
          }
          this.screen = this.screen.substring(0, this.screen.length - 1);
          this.currentValue = this.currentValue.substring(0, this.currentValue.length - 1);
          if (['+', '-', '*', '/'].includes(this.screen.slice(-1))) {
            this.latestButton = '+';
          }
        }
      }

      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'].includes(n)) {
        if (this.selectCalcPressed) {
          this.selectCalcPressed = false;
        }
        if (this.equalsPressed) {
          this.clear();
          this.equalsPressed = false;
        }
        if (n === '.') {
          if (this.dotPressed) {
            return;
          }
          this.dotPressed = true;
        }
        if (this.latestButton === 'ans' || this.selectVarPressed) {
          return;
        }
        this.currentValue += `${n}`;
        this.screen += `${n}`;
        this.latestButton = n;
      }

      if (['+', '-', '*', '/'].includes(n)) {
        if (this.screen === 'ERROR' || this.screen === '') {
          this.clear();
          return;
        }
        if (['+', '-', '*', '/'].includes(this.latestButton)) {
          this.screen = this.screen.substring(0, this.screen.length - 1) + n;
          this.latestOperation = n;
        } else {
          this.selectCalcPressed = false;
          if (this.latestOperation === '/') {
            this.prevValue = (parseFloat(this.prevValue) / parseFloat(this.currentValue))
              .toString();
          } else if (this.latestOperation === '-') {
            this.prevValue = (parseFloat(this.prevValue) - parseFloat(this.currentValue))
              .toString();
          } else if (this.latestOperation === '+') {
            this.prevValue = (parseFloat(this.prevValue) + parseFloat(this.currentValue))
              .toString();
          } else if (this.latestOperation === '*') {
            this.prevValue = (parseFloat(this.prevValue) * parseFloat(this.currentValue))
              .toString();
          } else {
            this.prevValue = parseFloat(this.currentValue).toString();
          }
          this.latestOperation = n;
          this.screen += `${n}`;
          this.currentValue = '';
          this.latestButton = n;
          this.equalsPressed = false;
          this.dotPressed = false;
          this.selectVarPressed = false;
        }
      }

      if (n === 'ans') {
        if (this.prevResult !== '' && !([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 'a', 'b', 'c', 'd', 'e',
          'ans']
          .includes(this.latestButton))) {
          if (this.equalsPressed) {
            this.clear();
          }
          this.screen += 'ans';
          this.currentValue = this.prevResult;
          this.latestButton = n;
        }
      }

      if (n === '=') {
        this.rechenString = this.screen;
        if (this.selectCalcPressed) {
          this.screen = this.prevValue;
          this.selectCalcPressed = false;
          this.equalsPressed = true;
          this.dotPressed = false;
          return;
        }
        if (['a', 'b', 'c', 'd', 'e'].includes(this.latestButton) && this.screen.length === 1) {
          switch (this.latestButton) {
            case 'a':
              this.screen = this.a;
              break;
            default:
              break;
          }
        }
        if (this.latestOperation === '+') {
          this.screen = (parseFloat(this.prevValue) + parseFloat(this.currentValue)).toString();
        }
        if (this.latestOperation === '-') {
          this.screen = (parseFloat(this.prevValue) - parseFloat(this.currentValue)).toString();
        }
        if (this.latestOperation === '*') {
          this.screen = (parseFloat(this.prevValue) * parseFloat(this.currentValue)).toString();
        }
        if (this.latestOperation === '/') {
          this.screen = (parseFloat(this.prevValue) / parseFloat(this.currentValue)).toString();
        }
        if (this.screen.startsWith('.') && this.screen.length > 1) {
          this.screen = `0${this.screen}`;
        }
        this.equalsPressed = true;
        this.dotPressed = false;
        this.latestButton = '=';
        if (this.screen === 'NaN' || this.screen === '.' || this.screen === 'ERROR') {
          this.clear();
          this.screen = 'ERROR';
        } else if (this.screen === '') {
          return;
        } else if ((this.latestButton && this.screen) === 'ans') {
          this.screen = this.prevResult;
          this.post();
          setTimeout(this.updateHistory, 300);
        } else {
          this.prevResult = this.screen;
          this.post();
          setTimeout(this.updateHistory, 300);
        }
      }

      console.log(`screen: ${this.screen}`);
      console.log(`curr: ${this.currentValue}`);
      console.log(`prevV: ${this.prevValue}`);
      console.log(`prevR: ${this.prevResult}`);
    },

    clear() {
      this.prevValue = '';
      this.currentValue = '';
      this.latestOperation = '';
      this.screen = '';
      this.latestButton = '';
      this.equalsPressed = true;
      this.dotPressed = false;
      this.rechenString = '';
      this.varPressed = false;
      this.selectVarPressed = false;
    },

    post() {
      const today = new Date();

      // Leading Zeros fix by: https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-display-two-digit-numbers
      const day = `0${today.getDate()}`.slice(-2);
      const month = `0${today.getMonth() + 1}`.slice(-2);
      const hours = `0${today.getHours()}`.slice(-2);
      const minutes = `0${today.getMinutes()}`.slice(-2);
      const seconds = `0${today.getSeconds()}`.slice(-2);

      const data = {
        rechnung: this.rechenString,
        datum: `${day}.${month}.${today.getFullYear()} ${hours}:${minutes}:${seconds}`,
        ergebnis: this.screen,
      };
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/rechnungen`;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      fetch(endpoint, requestOptions)
        .then((text) => { console.log(text); })
        .catch((error) => console.log('Error:', error));
    },

    updateHistory() {
      this.rechnungen = [];
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/rechnungen`;
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => result.forEach((rechnung) => {
          this.rechnungen.unshift(rechnung);
        }))
        .catch((error) => console.log('Error:', error));
    },

    deleteHistory() {
      for (let i = 0; i < this.rechnungen.length; i += 1) {
        const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/rechnungen/${this.rechnungen[i].id}`;
        const requestOptions = {
          method: 'DELETE',
        };

        fetch(endpoint, requestOptions)
          .then((text) => { console.log(text); })
          .catch((error) => console.log('Error:', error));
      }
      this.rechnungen = [];
    },
  },
};
</script>

<style scoped>
.list-group{
  max-height: 452px;
  overflow-y:scroll;
}
.bg-light-purple {
  background: #E6DFFF;
}
.bg-lighter-purple {
  background: #C9BBFF;
}
.bg-light-coral {
  background: lightcoral;
}
.bg-light-green {
  background: #B9FFD2;
}
.hover:hover {
  cursor: pointer;
  background: #F4F1FF;
}
.bg-dark-purple {
  background: #A696EC;
}
.container-fluid {
  user-select: none;
  height: calc(100vh - 56px);
}
</style>
