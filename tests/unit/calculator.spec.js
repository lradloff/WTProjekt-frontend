import {mount} from '@vue/test-utils';
import Calculator from "../../src/components/Calculator";

describe('Testing Calculator.vue', () => {
  it('should return right result when adding', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress('+')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.prevResult).toEqual('2')

    wrapper.vm.buttonPress('+')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress(8)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.prevResult).toEqual('110')

    wrapper.vm.buttonPress('+')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.prevResult).toEqual('111.111')


  })

  it('should return right result when subtracting', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress(4)
    wrapper.vm.buttonPress('-')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.prevResult).toEqual('14')

    wrapper.vm.buttonPress('-')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(9)
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(5)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.prevResult).toEqual('-5.5')


  })

  it('should return right result when multiplying', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress('*')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.prevResult).toEqual('144')

    wrapper.vm.buttonPress('*')
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.prevResult).toEqual('14.4')


  })

  it('should return right result when dividing', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.buttonPress(8)
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress('/')
    wrapper.vm.buttonPress(9)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.prevResult).toEqual('9')

    wrapper.vm.buttonPress('/')
    wrapper.vm.buttonPress(4)
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(5)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.prevResult).toEqual('2')


  });

  it('should return right amount of calculations and correct data', () => {

    const wrapper = mount(Calculator)

    const today = new Date();

    // Leading Zeros fix by: https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-display-two-digit-numbers
    const day = `0${today.getDate()}`.slice(-2);
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const hours = `0${today.getHours()}`.slice(-2);
    const minutes = `0${today.getMinutes()}`.slice(-2);
    const seconds = `0${today.getSeconds()}`.slice(-2);

    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress('/')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress('=')

    const calc1 = wrapper.vm.rechenString
    const result1 = wrapper.vm.prevResult

    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress(4)
    wrapper.vm.buttonPress('*')
    wrapper.vm.buttonPress(3)
    wrapper.vm.buttonPress('+')
    wrapper.vm.buttonPress(3)
    wrapper.vm.buttonPress('=')

    const calc2 = wrapper.vm.rechenString
    const result2 = wrapper.vm.prevResult

    wrapper.setData({
      rechnungen: [
        {
          id: 1,
          rechnung: calc1,
          ergebnis: result1,
          datum: `${day}.${month}.${today.getFullYear()} ${hours}:${minutes}:${seconds}`
        },
        {
          id: 2,
          rechnung: calc2,
          ergebnis: result2,
          datum: `${day}.${month}.${today.getFullYear()} ${hours}:${minutes}:${seconds}`
        }
      ]
      }
    )

    expect(wrapper.vm.rechnungen.length).toEqual(2)
    expect(wrapper.vm.rechnungen[0].rechnung).toEqual('10/10')
    expect(wrapper.vm.rechnungen[0].ergebnis).toEqual('1')
    expect(wrapper.vm.rechnungen[1].rechnung).toEqual('24*3+3')
    expect(wrapper.vm.rechnungen[1].ergebnis).toEqual('75')

  });


});
