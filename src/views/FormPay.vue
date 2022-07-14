<template>
  <div class="part">
    <h2>付款資訊</h2>
    <div class="card-name-wrapper">
      <div class="card-name">
        <label class="form-label">持卡人姓名</label>
        <input
          v-model="formData.ccName"
          type="text"
          class="frame"
          placeholder="John Doe"
        />
      </div>
    </div>
    <div class="card-wrapper">
      <div class="card">
        <label class="form-label">卡號</label>
        <input
          v-model="formData.cardNumber"
          type="text"
          class="frame"
          placeholder="1111 2222 3333 4444"
        />
      </div>
    </div>

    <div class="date-cvc">
      <div class="date">
        <label class="form-label">有效期限</label>
        <input
          v-model="formData.expDate"
          type="text"
          class="frame"
          placeholder="MM/YY"
        />
      </div>
      <div class="cvc">
        <label class="form-label">CVC / CCV</label>
        <input
          v-model="formData.ccv"
          type="text"
          class="frame"
          placeholder="123"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormPay",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped src="./../assets/scss/form-pay.scss" lang="scss">
</style>