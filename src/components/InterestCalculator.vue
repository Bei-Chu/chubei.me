<template>
  <div>
    <input type="number" placeholder="0" v-on:input="inputFlow($event.target.value)">
    <input type="number" placeholder="1" v-on:input="inputMonthNum($event.target.value)">
    <button v-on:click="addCashFlow">+</button>
    <button v-on:click="clearCashFlow">clear</button>
    <div><button v-on:click="calculate">calculate</button></div>
    <div>{{result}}</div>
    <ul>
      <li v-for="(cash, index) of cashFlows">
        month {{index}}: {{cash}} <button v-on:click="removeCashFlow(index)">-</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import MyMath from '../scripts/math';

  const data = {
    cashFlows: [],
    result: '',
  };
  let flow = 0;
  let monthNum = 1;
  export default {
    name: 'InterestCalculator',
    data() {
      return data;
    },
    methods: {
      addCashFlow() {
        if (monthNum > 0 && !isNaN(flow)) {
          for (let i = 0; i < monthNum; i += 1) {
            data.cashFlows.push(flow);
          }
        }
      },
      removeCashFlow(index) {
        data.cashFlows.splice(index, 1);
      },
      clearCashFlow() {
        data.cashFlows.splice(0);
        data.result = '';
      },
      inputFlow(newFlow) {
        flow = parseFloat(newFlow);
      },
      inputMonthNum(newMonthNum) {
        monthNum = parseInt(newMonthNum, 10);
      },
      calculate() {
        const irr = MyMath.irr(data.cashFlows);
        data.result = `Annual interest is ${irr * 12 * 100}%`;
      },
    },
  };
</script>

<style scoped>
  
</style>
