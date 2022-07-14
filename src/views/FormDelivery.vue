<template>
  <div class="part">
    <h2>運送方式</h2>
    <label
      @click="handleShipFee(0, '免費')"
      for="normal"
      class="shipment normal click-shipment active"
    >
      <input
        type="radio"
        name="shipment"
        id="normal"
        class="click-shipment shipment-option"
        :checked="formData.shippingFee === 0 || -1"
      />
      <label for="normal" class="ship-way">
        <p class="ship-text click-shipment">標準運送</p>
        <p class="ship-text click-shipment">約 3~7 個工作天</p>
      </label>
      <p class="ship-detail click-shipment">免費</p>
    </label>
    <label
      @click="handleShipFee(500, '$500')"
      for="dhl"
      class="shipment dhl click-shipment"
    >
      <input
        type="radio"
        name="shipment"
        id="dhl"
        class="dhl click-shipment shipment-option"
        :checked="formData.shippingFee === 500"
      />
      <label for="dhl" class="ship-way dhl">
        <p class="dhl ship-text click-shipment">DHL 貨運</p>
        <p class="dhl ship-text click-shipment">48 小時內送達</p>
      </label>
      <p class="ship-detail">$500</p>
    </label>
  </div>
</template>

<script>
export default {
  name: "FormDelivery",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ship: "免費",
      shipFee: 0,
    };
  },
  methods: {
    handleShipFee(shipFee, shipWay) {
      this.formData.shippingFee = shipFee;
      // 把運費、運送方式資料傳回到 form，再從 form 傳到 bucket (component)
      this.$emit("after-handle-shipFee", shipFee, shipWay);
    },
  },
};
</script>

<style scoped src="./../assets/scss/form-delivery.scss" lang="scss">
</style>