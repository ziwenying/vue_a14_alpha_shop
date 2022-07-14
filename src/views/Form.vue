<template>
  <!-- checkout -->
  <div class="checkout">
    <div class="container">
      <h1>結帳</h1>
      <!-- left -->
      <div class="left-content">
        <!-- step -->
        <Stepper :steps="steps" :currentStep="currentStep" />
        <!-- form -->
        <div class="form-panel">
          <div class="form-container">
            <!-- 表單放入位置 part one two three -->
            <router-view
              :formData="formData"
              @after-handle-shipFee="afterHandleShipFee"
            />
          </div>
        </div>
        <!-- btn -->
        <BtnStep
          :buttonStates="buttonStates"
          @after-change-currentStep="afterChangeCurrentStep"
          @submit-form="submitForm"
        />
      </div>
      <!-- right -->
      <div class="right-content">
        <Bucket
          @after-cal-total="afterCalTotal"
          :clear="clear"
          :formData="formData"
          :shipFee="shipFee"
          :shipWay="shipWay"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "../components/Stepper";
import BtnStep from "../components/BtnStep";
import Bucket from "../components/Bucket";

const STORAGE_KEY = "checkout-data";

// 控制步驟進度 樣式 使用
const dummySteps = {
  steps: [
    {
      step: 1,
      firstPage: {
        checked: false,
        active: true,
      },
      secondPage: {
        checked: false,
        active: false,
      },
      threePage: {
        checked: false,
        active: false,
      },
    },
    {
      step: 2,
      firstPage: {
        checked: true,
        active: true,
      },
      secondPage: {
        checked: false,
        active: true,
      },
      threePage: {
        checked: false,
        active: false,
      },
    },
    {
      step: 3,
      firstPage: {
        checked: true,
        active: true,
      },
      secondPage: {
        checked: true,
        active: true,
      },
      threePage: {
        checked: false,
        active: true,
      },
    },
  ],
};

// 控制按鈕進度 樣式 使用
const dummyButtonStates = {
  buttonStates: [
    {
      page: 1,
      stepPrev: "",
      arrowPrev: "",
      stepNext: "下一步",
      arrowNext:
        "https://github.com/ziwenying/A3_ALPHA_Shop-SCSS/blob/main/src/image/arrow02.png?raw=true",
    },
    {
      page: 2,
      stepPrev: "上一步",
      arrowPrev:
        "https://github.com/ziwenying/A3_ALPHA_Shop-SCSS/blob/main/src/image/arrow01.png?raw=true",
      stepNext: "下一步",
      arrowNext:
        "https://github.com/ziwenying/A3_ALPHA_Shop-SCSS/blob/main/src/image/arrow02.png?raw=true",
    },
    {
      page: 3,
      stepPrev: "上一步",
      arrowPrev:
        "https://github.com/ziwenying/A3_ALPHA_Shop-SCSS/blob/main/src/image/arrow01.png?raw=true",
      stepNext: "確認下單",
      arrowNext: "",
    },
  ],
};

export default {
  name: "Form",
  components: {
    Stepper,
    BtnStep,
    Bucket,
  },
  data() {
    return {
      buttonStates: [],
      steps: [],
      currentStep: 1,
      shipFee: -1,
      shipWay: "",
      stepsName: "", //路由名稱
      formData: {
        salutation: "",
        username: "",
        phone: "",
        email: "",
        city: "",
        addr: "",
        shippingFee: 0,
        ccName: "",
        cardNumber: "",
        expDate: "",
        ccv: "",
        totalPrice: 5298,
      },
      clear: false, //判斷送出表單後清除購物籃內資料
    };
  },
  created() {
    this.fetchData();

    // 取出瀏覽器中既有的資料，如果沒有就取預設資料
    this.formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      salutation: "",
      username: "",
      phone: "",
      email: "",
      city: "",
      addr: "",
      shippingFee: 0,
      ccName: "",
      cardNumber: "",
      expDate: "",
      ccv: "",
      totalPrice: 5298,
    };
  },
  methods: {
    fetchData() {
      this.buttonStates = dummyButtonStates.buttonStates;
      this.steps = dummySteps.steps;
    },
    afterChangeCurrentStep(currentStep) {
      // 使「路由」和「表單畫面」對應到正確的步驟
      this.currentStep = currentStep;
      if (currentStep === 3 && this.stepsName === "form-pay") {
        return;
      }
      switch (currentStep) {
        case 1:
          this.stepsName = "form-address";
          break;
        case 2:
          this.stepsName = "form-delivery";
          break;
        case 3:
          this.stepsName = "form-pay";
          break;
      }
      this.$router.push({ name: this.stepsName });
    },
    afterHandleShipFee(shipFee, shipWay) {
      // 表單的「運費」和「運送方式」的資料，要傳到 購物車 (bucket) 內  使用
      this.shipFee = shipFee;
      this.shipWay = shipWay;
    },
    afterCalTotal(total) {
      // 紀錄 購物車內總金額，最後印出 表單內容時使用
      this.formData.totalPrice = total;
    },
    submitForm() {
      // 印出 表單內容
      console.log(this.formData);
      alert(`total $${this.formData.totalPrice}`);
      // 變回預設資料
      this.formData = {
        salutation: "",
        username: "",
        phone: "",
        email: "",
        city: "",
        addr: "",
        shippingFee: 0,
        ccName: "",
        cardNumber: "",
        expDate: "",
        ccv: "",
        totalPrice: 5298,
      };
      //當 this.clear 改變，清除購物車內資料
      this.clear = !this.clear;
    },
    saveStorage() {
      // 存表單資料到 localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.formData));
    },
  },
  watch: {
    formData: {
      handler: function () {
        // 如果 formData 表單資料有改變 → 重新存資料到 localStorage
        this.saveStorage();
      },
      deep: true,
    },
    "$route.path": {
      handler: function (path) {
        // 直接改變網址 要出現對應的步驟狀態
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
      },
      deep: true,
    },
  },
};
</script>

<style scoped src="./../assets/scss/form.scss" lang="scss">
</style>