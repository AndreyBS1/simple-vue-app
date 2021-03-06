const Product = Vue.createApp({
  data() {
    return {
      premium: true,
    }
  },
})

Product.component("product", {
  template: `
    <div class="product">
    
      <div class="product-image">
        <img :src="image" :alt="altText"/>
      </div>
  
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
      
        <ul>
          <li v-for="detail in details">
            {{ detail }}
          </li>
        </ul>
      
        <div
           class="color-box"
           v-for="(variant, index) in variants"
           :key="variant.variantId"
           :style="{ backgroundColor:variant.variantColor }"
           @mouseover="updateProduct(index)"
        >
        </div>
    
        <button
            @click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
        >
            Add to cart
        </button>
  
        <div class="cart">
            <p>In cart: {{ cart }}</p>
        </div>
    
        <a :href="link">More products like this</a>
      </div>
    </div>
  `,
  
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  
  data() {
    return {
      product: "Socks",
      brand: 'Vue Mastery',
      description: "A pair of warm, fuzzy socks",
      selectedVariant: 0,
      altText: "A pair of socks",
      link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 1,
          variantColor: 'green',
          variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
          variantQuantity: 10,
        },
        {
          variantId: 2,
          variantColor: 'blue',
          variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
          variantQuantity: 0,
        }
      ],
      cart: 0,
    }
  },
  
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    
    inStock(){
      return this.variants[this.selectedVariant].variantQuantity
    },
    
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return 2.99
      }
    },
  },
  
  methods: {
    addToCart() {
      this.cart += 1
    },
    
    updateProduct(index) {
      this.selectedVariant = index;
    }
  },
})

Product.mount("#app")