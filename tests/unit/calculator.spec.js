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

  it('should reset everything but the last result when pressing "AC"', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.buttonPress(3)
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress('/')
    wrapper.vm.buttonPress(5)
    wrapper.vm.buttonPress('=')
    wrapper.vm.buttonPress('+')
    wrapper.vm.buttonPress(3)

    expect(wrapper.vm.screen).toEqual('6+3')
    expect(wrapper.vm.currentValue).toEqual('3')
    expect(wrapper.vm.prevValue).toEqual('6')
    expect(wrapper.vm.latestOperation).toEqual('+')
    expect(wrapper.vm.latestButton).toEqual(3)
    expect(wrapper.vm.prevResult).toEqual('6')
    expect(wrapper.vm.rechenString).toEqual('30/5')
    expect(wrapper.vm.equalsPressed).toBe(false)
    expect(wrapper.vm.dotPressed).toBe(false)
    expect(wrapper.vm.selectCalcPressed).toBe(false)

    wrapper.vm.buttonPress('AC')

    expect(wrapper.vm.screen).toEqual('')
    expect(wrapper.vm.currentValue).toEqual('')
    expect(wrapper.vm.prevValue).toEqual('')
    expect(wrapper.vm.latestOperation).toEqual('')
    expect(wrapper.vm.latestButton).toEqual('')
    expect(wrapper.vm.prevResult).toEqual('6')
    expect(wrapper.vm.selectCalcResult).toEqual('')
    expect(wrapper.vm.equalsPressed).toBe(true)
    expect(wrapper.vm.dotPressed).toBe(false)
    expect(wrapper.vm.rechenString).toEqual('')
    expect(wrapper.vm.selectCalcPressed).toBe(false)
    expect(wrapper.vm.varPressed).toBe(false)
    expect(wrapper.vm.selectVarPressed).toBe(false)
    expect(wrapper.vm.minusFirst).toBe(false)

  });

  it('should only delete last digit of current number when pressing "⌫", including decimal point', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress('*')
    wrapper.vm.buttonPress(3)
    wrapper.vm.buttonPress(3)
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(3)

    //make sure that the current number is correct
    expect(wrapper.vm.currentValue).toEqual('33.3')

    wrapper.vm.buttonPress('⌫')

    expect(wrapper.vm.currentValue).toEqual('33.')

    //make sure that decimal points can be deleted
    wrapper.vm.buttonPress('⌫')
    expect(wrapper.vm.currentValue).toEqual('33')

    //make sure that deleting does not exceed the current number (does not delete the '*')
    wrapper.vm.buttonPress('⌫')
    wrapper.vm.buttonPress('⌫')
    wrapper.vm.buttonPress('⌫')
    wrapper.vm.buttonPress('⌫')

    expect(wrapper.vm.currentValue).toEqual('')
    expect(wrapper.vm.screen).toEqual('100*')

  });

  it('should change operand when consecutively pressing them', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.buttonPress(5)
    wrapper.vm.buttonPress('+')

    expect(wrapper.vm.screen).toEqual('5+')

    wrapper.vm.buttonPress('-')

    expect(wrapper.vm.screen).toEqual('5-')

    wrapper.vm.buttonPress('*')

    expect(wrapper.vm.screen).toEqual('5*')

    wrapper.vm.buttonPress('/')

    expect(wrapper.vm.screen).toEqual('5/')

  });

  it('should not allow a number to have more than 1 decimal point', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.buttonPress(3)
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(3)
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(3)

    wrapper.vm.buttonPress('+')
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(3)
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(5)

    expect(wrapper.vm.screen).toEqual('3.33+.35')

    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.screen).toEqual('3.68')

  });

  it('should clear the whole history when pressing the delete history button', () => {

    const wrapper = mount(Calculator)

    wrapper.setData({
        rechnungen: [
          {
            id: 1,
            rechnung: '10*10+3',
            ergebnis: '103',
            datum: `05.01.2022 -- 13:02:22`
          },
          {
            id: 2,
            rechnung: '3/3+6',
            ergebnis: '7',
            datum: `02.01.2022 -- 23:10:38`
          }
        ]
      })

    expect(wrapper.vm.rechnungen.length).toEqual(2)

    wrapper.vm.deleteHistory()

    expect(wrapper.vm.rechnungen.length).toEqual(0)
  });

  it('should save number to the selected variable', () => {

    const wrapper = mount(Calculator)

    //a
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress('var')
    wrapper.vm.selectVar('a')

    //b
    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress('*')
    wrapper.vm.buttonPress(3)
    wrapper.vm.buttonPress('=')
    wrapper.vm.buttonPress('var')
    wrapper.vm.selectVar('b')

    //c
    wrapper.setData({
        rechnungen: [
          {
            id: 821,
            rechnung: "34*2+2",
            ergebnis: "70",
            datum: "07.01.2022 "
          }
        ]
      }
    )
    wrapper.vm.selectCalc(821)
    wrapper.vm.buttonPress('/')
    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress('=')
    wrapper.vm.buttonPress('var')
    wrapper.vm.selectVar('c')

    //d
    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress(2)
    wrapper.vm.buttonPress('var')
    wrapper.vm.selectVar('d')

    //e
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(3)
    wrapper.vm.buttonPress(4)
    wrapper.vm.buttonPress(5)
    wrapper.vm.buttonPress('var')
    wrapper.vm.selectVar('e')

    expect(wrapper.vm.a).toEqual('122')
    expect(wrapper.vm.b).toEqual('6')
    expect(wrapper.vm.c).toEqual('35')
    expect(wrapper.vm.d).toEqual('2222')
    expect(wrapper.vm.e).toEqual('0.345')

    //save a to c
    wrapper.vm.selectVar('a')
    wrapper.vm.buttonPress('var')
    wrapper.vm.selectVar('c')

    expect(wrapper.vm.a).toEqual('122')
    expect(wrapper.vm.c).toEqual('122')

  });

  it('should get correct number from a variable', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.a = '1';
    wrapper.vm.b = '2';
    wrapper.vm.c = '3.5';
    wrapper.vm.d = '4';
    wrapper.vm.e = '5.25';

    wrapper.vm.selectVar('a')
    wrapper.vm.buttonPress('*')
    wrapper.vm.selectVar('b')
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.screen).toEqual('2')

    wrapper.vm.buttonPress('+')
    wrapper.vm.selectVar('c')
    wrapper.vm.buttonPress('-')
    wrapper.vm.selectVar('d')
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.screen).toEqual('1.5')

    wrapper.vm.selectVar('e')
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.screen).toEqual('5.25')

  });

  it('should delete every variable when pressing the delete variables button', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.a = '1251';
    wrapper.vm.b = '0.312';
    wrapper.vm.c = '34';
    wrapper.vm.d = '4.154512';
    wrapper.vm.e = '550012.23123';

    wrapper.vm.deleteVars()

    expect(wrapper.vm.a).toEqual('')
    expect(wrapper.vm.b).toEqual('')
    expect(wrapper.vm.c).toEqual('')
    expect(wrapper.vm.d).toEqual('')
    expect(wrapper.vm.e).toEqual('')

  });

  it('should be able to negate numbers, ans and variables', () => {

    const wrapper = mount(Calculator)

    wrapper.vm.a = '-100';
    wrapper.vm.b = '0';

    wrapper.vm.buttonPress('-')
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress('.')
    wrapper.vm.buttonPress(5)
    wrapper.vm.buttonPress('+')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.screen).toEqual('0.5')
    wrapper.vm.buttonPress('AC')

    wrapper.vm.buttonPress('-')
    wrapper.vm.selectVar('a')
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.screen).toEqual('100')
    wrapper.vm.buttonPress('AC')

    wrapper.vm.buttonPress('-')
    wrapper.vm.buttonPress('ans')
    wrapper.vm.buttonPress('+')
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.screen).toEqual('-99')
    wrapper.vm.buttonPress('AC')

    wrapper.vm.buttonPress('-')
    wrapper.vm.selectVar('b')
    wrapper.vm.buttonPress('=')

    expect(wrapper.vm.screen).toEqual('0')

  });

  it('should return ERROR in case of a syntax error', () => {

    const wrapper = mount(Calculator)

    //when trying to divide by zero
    wrapper.vm.buttonPress(1)
    wrapper.vm.buttonPress('/')
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress('=')
    expect(wrapper.vm.screen).toEqual('ERROR')

    wrapper.vm.buttonPress(8)
    wrapper.vm.buttonPress('/')
    wrapper.vm.buttonPress(0)
    wrapper.vm.buttonPress('+')
    expect(wrapper.vm.screen).toEqual('ERROR')

  });



  it('should return right amount of calculations and their data', () => {

    const wrapper = mount(Calculator)

    const today = new Date();

    // Leading Zeros fix by: https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-display-two-digit-numbers
    const day = `0${today.getDate()}`.slice(-2);
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const hours = `0${today.getHours()}`.slice(-2);
    const minutes = `0${today.getMinutes()}`.slice(-2);
    const seconds = `0${today.getSeconds()}`.slice(-2);
    const datum = `${day}.${month}.${today.getFullYear()} -- ${hours}:${minutes}:${seconds}`

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
          datum: datum
        },
        {
          id: 2,
          rechnung: calc2,
          ergebnis: result2,
          datum: datum
        }
      ]
      }
    )

    expect(wrapper.vm.rechnungen.length).toEqual(2)
    expect(wrapper.vm.rechnungen[0].rechnung).toEqual('10/10')
    expect(wrapper.vm.rechnungen[0].ergebnis).toEqual('1')
    expect(wrapper.vm.rechnungen[0].datum).toEqual(datum)
    expect(wrapper.vm.rechnungen[1].rechnung).toEqual('24*3+3')
    expect(wrapper.vm.rechnungen[1].ergebnis).toEqual('75')
    expect(wrapper.vm.rechnungen[1].datum).toEqual(datum)

  });
});
