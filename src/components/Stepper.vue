<template>
  <div class="step-container">
    <div class="circle-wrapper">
      <div
        class="circle"
        :class="{
          active: StepState.firstPage.active,
          checked: StepState.firstPage.checked,
        }"
      >
        <span
          class="line"
          :class="{
            active: StepState.firstPage.active,
            checked: StepState.firstPage.checked,
          }"
        ></span>
      </div>
      <p class="circle-text" :class="{ active: StepState.firstPage.active }">
        寄送地址
      </p>
    </div>
    <div class="circle-wrapper">
      <div
        class="circle"
        :class="{
          active: StepState.secondPage.active,
          checked: StepState.secondPage.checked,
        }"
      >
        <span
          class="line"
          :class="{ active: StepState.secondPage.active }"
        ></span>
      </div>
      <p class="circle-text" :class="{ active: StepState.secondPage.active }">
        運送方式
      </p>
    </div>
    <div class="circle-wrapper">
      <div class="circle" :class="{ active: StepState.threePage.active }"></div>
      <p class="circle-text" :class="{ active: StepState.threePage.active }">
        付款資訊
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stepper",
  props: {
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      StepState: {}, //目前的步驟狀態 的樣式
    };
  },
  created() {
    this.StepState = this.steps[0];
  },
  methods: {
    getStepState() {
      this.StepState = this.steps.find(
        (step) => step.step === this.currentStep
      );
    },
  },
  watch: {
    currentStep: {
      // currentStep 若改變，步驟狀態改變
      handler: function () {
        this.getStepState();
      },
      deep: true,
    },
  },
};
</script>

<style scoped src="./../assets/scss/stepper.scss" lang="scss">
</style>