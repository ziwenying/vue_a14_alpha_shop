# vue_a14_alpha_shop
## 介紹
Alpha Shop 購物車
內含：導覽列、訂購表單、購物車、頁尾

## 功能特點
- 導覽列：在窄螢幕會縮成漢堡排。
- 訂購表單分三步驟，含寄送地址、運送方式、付款資訊，以「上一步」和「下一步」按鈕切換，且不會產生頁面跳轉的情況。
- 訂購表單重新整理後，會保留未完成資料。
- 購物車頁面有兩樣商品，並顯示數量、價格、總金額；可使用「+」、「-」按鈕來增加數量，總金額會隨之調整。
- 頁尾在窄螢幕不顯示。



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 開發工具
- sass ^1.26.7
- sass-loader ^8.0.2
- vue ^2.6.11
- vue-router ^3.5.1
- bootstrap ^4.4.1