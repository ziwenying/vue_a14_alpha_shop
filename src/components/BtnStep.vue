<template>
  <div class="btn-control">
    <div class="btn-wrapper">
      <button
        v-if="currentStep !== 1"
        @click.prevent.stop="handleStep('prev')"
        class="btn-back"
      >
        <div class="btn-back-center">
          <div
            class="btn-back-center"
            :class="{ arrow: currentStep !== 1 }"
          ></div>
          {{ currentButtonState.stepPrev }}
        </div>
      </button>
      <button
        @click.prevent.stop="handleStep('next')"
        type="submit"
        class="btn-next"
      >
        <div class="btn-next-center">
          {{ currentButtonState.stepNext }}
          <div :class="{ arrow: currentStep !== 3 }"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BtnStep",
  props: {
    buttonStates: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentStep: 1,
      currentButtonState: {},
    };
  },
  created() {
    //如果直接改變路由，按鈕的樣式要改變
    switch (this.$route.path) {
      case "/form/1":
        this.currentStep = 1;
        break;
      case "/form/2":
        this.currentStep = 2;
        break;
      case "/form/3":
        this.currentStep = 3;
        break;
    }
    this.currentButtonState = this.getButtonState(this.currentStep);
  },
  methods: {
    handleStep(stepAction) {
      const getButtonState = () => {
        return this.buttonStates.find(
          (buttonState) => buttonState.page === this.currentStep
        );
      };

      if (stepAction === "prev") {
        // 符合上一步的條件
        switch (this.currentStep) {
          case 1:
            this.currentStep;
            break;
          case 2:
            this.currentStep--;
            break;
          case 3:
            this.currentStep--;
            break;
        }
      } else if (stepAction === "next") {
        // 符合下一步的條件
        switch (this.currentStep) {
          case 1:
            this.currentStep++;
            break;
          case 2:
            this.currentStep++;
            break;
          case 3:
            //如果在第三步又按下一步 --> 送出表單
            this.$emit("submit-form");
            //回到第一步
            this.currentStep = 1;
            break;
        }
      }
      //取得當前按鈕狀態
      this.currentButtonState = getButtonState(this.currentStep);
      //當前步驟 傳回父層 form
      this.$emit("after-change-currentStep", this.currentStep);
    },
    getButtonState() {
      return this.buttonStates.find(
        (buttonState) => buttonState.page === this.currentStep
      );
    },
  },
  watch: {
    "$route.path": {
      handler: function (path) {
        // 直接改變網址 要出現對應的按鈕
        switch (path) {
          case "/form/1":
            this.currentStep = 1;
            break;
          case "/form/2":
            this.currentStep = 2;
            break;
          case "/form/3":
            this.currentStep = 3;
            break;
        }
        this.currentButtonState = this.getButtonState(this.currentStep);
      },
      deep: true,
    },
  },
};
</script>

<style scoped src="./../assets/scss/btn-step.scss" lang="scss">
</style>