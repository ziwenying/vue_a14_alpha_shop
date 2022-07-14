<template>
  <div class="bucket">
    <h3 class="bucket-title">購物籃</h3>
    <div class="bucket-content">
      <div v-for="product in bucket.products" :key="product.id" class="product">
        <img :src="product.image" alt="" class="product-image" />
        <div class="product-detail">
          <p>{{ product.name }}</p>
          <div class="count">
            <img
              @click="handleBucketProduct(product.id, 'minus')"
              src="../assets/image/minus.png"
              alt=""
              class="minus little-btn"
            />
            <p class="count-number">{{ product.count }}</p>
            <img
              @click="handleBucketProduct(product.id, 'plus')"
              src="../assets/image/plus.png"
              alt=""
              class="plus little-btn"
            />
          </div>
          <div class="amount">{{ product.amount }}</div>
        </div>
      </div>
      <div class="bucket-row">
        <p class="ship-fee">運費</p>
        <p class="free">{{ this.bucket.getShipWay }}</p>
      </div>
      <div class="bucket-row">
        <p>小計</p>
        <p class="total">{{ bucket.total }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = "bucket-data";

const dummyData = {
  products: [
    {
      id: 1,
      image:
        "https://github.com/ziwenying/A3_ALPHA_Shop-SCSS/blob/main/src/image/product01.png?raw=true",
      name: "破壞補丁修身牛仔褲",
      price: 3999,
      count: 1,
      amount: 3999,
    },
    {
      id: 2,
      image:
        "https://github.com/ziwenying/A3_ALPHA_Shop-SCSS/blob/main/src/image/product02.png?raw=true",
      name: "刷色直筒牛仔褲",
      price: 1299,
      count: 1,
      amount: 1299,
    },
  ],
};

export default {
  name: "Bucket",
  props: {
    formData: {
      type: Object,
      required: true,
    },
    shipFee: {
      type: Number,
      required: true,
    },
    shipWay: {
      type: String,
      required: true,
    },
    clear: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      bucket: {
        products: [],
        total: 5298,
        getShipWay: "",
      },
    };
  },
  created() {
    this.fetchProducts();
    this.fetchShipWay();
    this.handleBucketProduct();
  },
  methods: {
    fetchProducts() {
      this.bucket.products =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || dummyData.products;
    },
    fetchShipWay() {
      this.bucket.getShipWay =
        this.formData.shippingFee === 0 ? "免費" : "$500";
    },
    handleBucketProduct(productId, plusMinus) {
      const calPlus = () => {
        return this.bucket.products.map((product) => {
          return product.id === productId
            ? {
                ...product,
                count: product.count + 1,
                amount: (product.count + 1) * product.price,
              }
            : product;
        });
      };
      const calMinus = () => {
        return this.bucket.products.map((product) => {
          return product.id === productId && product.count > 0
            ? {
                ...product,
                count: product.count - 1,
                amount: (product.count - 1) * product.price,
              }
            : product;
        });
      };
      const handleTotal = () => {
        this.bucket.total = this.formData.shippingFee;
        this.bucket.products.forEach((product) => {
          this.bucket.total += product.amount;
        });
      };

      if (plusMinus === "plus") {
        // 增加產品樹廖
        this.bucket.products = calPlus();
      } else if (plusMinus === "minus") {
        // 減少產品數量
        this.bucket.products = calMinus();
      }
      // 計算總金額
      handleTotal();
      //傳回父層 form
      this.$emit("after-cal-total", this.bucket.total);
    },
    addShipFee() {
      // 運費變化後，購物籃資料改變，總金額計算好傳回父層 form
      if (this.shipWay === "$500") {
        this.bucket.total += 500;
        this.bucket.getShipWay = "$500";
      } else if (this.shipWay === "免費") {
        this.bucket.total -= 500;
        this.bucket.getShipWay = "免費";
      }
      this.$emit("after-cal-total", this.bucket.total);
    },
    saveStorage() {
      // 存購物籃資料到 localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bucket.products));
    },
  },
  watch: {
    shipFee: {
      handler: function () {
        this.addShipFee();
      },
      deep: true,
    },
    clear: {
      handler: function () {
        // 送出表單後，購物車資料恢復成原始資料
        this.bucket.products = dummyData.products;
        this.bucket.total = 5298;
        this.bucket.getShipWay = "免費";
      },
      deep: true,
    },
    bucket: {
      // 購物車內資料存到 localStorage
      handler: function () {
        this.saveStorage();
      },
      deep: true,
    },
  },
};
</script>

<style scoped src="./../assets/scss/bucket.scss" lang="scss">
</style>