<template>
  <div class="part">
    <h2>寄送地址</h2>
    <div class="gender-name">
      <div class="gender">
        <label class="form-label">稱謂</label>
        <div class="select-wrapper">
          <select v-model="formData.salutation" class="frame">
            <option value="" selected disabled>請選擇稱謂</option>
            <option value="Mr.">先生</option>
            <option value="Ms.">小姐</option>
          </select>
        </div>
      </div>
      <div class="name">
        <label class="form-label">姓名</label>
        <input
          v-model="formData.username"
          type="text"
          class="frame"
          placeholder="請輸入姓名"
        />
      </div>
    </div>
    <div class="phone-email">
      <div class="phone">
        <label class="form-label">電話</label>
        <input
          v-model="formData.phone"
          type="text"
          class="form-frame"
          placeholder="請輸入行動電話"
        />
      </div>
      <div class="email">
        <label class="form-label">Email</label>
        <input
          v-model="formData.email"
          type="text"
          class="form-frame"
          placeholder="請輸入電子郵件"
        />
      </div>
    </div>

    <div class="city-address">
      <div class="city">
        <label class="form-label">縣市</label>
        <div class="select-wrapper">
          <select
            v-model="formData.city"
            name=""
            class="form-frame"
            placeholder="請選擇縣市"
          >
            <option value="" selected disabled>請選擇縣市</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.cityName }}
            </option>
          </select>
        </div>
      </div>
      <div class="address">
        <label for="" class="form-label">地址</label>
        <input
          v-model="formData.addr"
          type="text"
          class="frame"
          placeholder="請輸入地址"
        />
      </div>
    </div>
  </div>
</template>

<script>
const dummyData = {
  cities: [
    {
      id: 1,
      cityName: "台北市",
    },
    {
      id: 2,
      cityName: "台中市",
    },
    {
      id: 3,
      cityName: "高雄市",
    },
  ],
};

export default {
  name: "FormAddress",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cities: [],
    };
  },
  created() {
    this.fetchCities();
  },
  methods: {
    fetchCities() {
      // 城市下拉選單使用
      this.cities = dummyData.cities;
    },
  },
};
</script>

<style scoped src="./../assets/scss/form-address.scss" lang="scss">
</style>