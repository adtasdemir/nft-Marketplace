<template>
  <div class="nft-card">
    <h3 class="nft-title">{{ nft.title }}</h3>
    <div class="nft-media-container">
      <img v-if="nft.type === 'image'" :src="nft.image" alt="NFT image" class="nft-media" />
      <video v-if="nft.type === 'video'" :src="nft.image" controls class="nft-media" />
    </div>
    <p class="nft-price">{{ nft.price + ' ' + nft.currency }}</p>
    <v-btn class="buy-btn" color="primary" @click="buyNFT(nft.id)">Buy Now</v-btn>
  </div>
</template>

<script>
export default {
  name: 'NFTCard',
  props: {
    nft: Object
  },
  methods: {
    buyNFT(id) {
      // TODO: Handle buying NFT
      console.log('Buying NFT with ID:', id);
    }
  }
}
</script>



























<style scoped>
.nft-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  overflow: hidden;
  text-align: center;
  border-radius: 12px; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  transition: box-shadow 0.3s ease, transform 0.3s ease; 
  background-color: #fff;
}

.nft-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px); 
}

.nft-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px; 
}

.nft-price {
  font-size: 1rem;
  font-weight: normal;
  color: #ff5722; 
  margin-bottom: 16px; 
}

.nft-media-container {
  width: 100%;
  height: 200px; 
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px; 
}

.nft-media {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; 
  border-radius: 8px;
}

.buy-btn {
  padding: 8px 16px; 
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase; 
  border-radius: 24px; 
}

.buy-btn:hover {
  background-color: #ff5722; 
  transform: scale(1.05); 
}

@media (max-width: 768px) {
  .nft-card {
    padding: 12px;
    margin: 8px;
  }

  .nft-media-container {
    height: 150px; 
  }

  .nft-title {
    font-size: 1rem;
  }

  .nft-price {
    font-size: 0.9rem;
  }

  .buy-btn {
    font-size: 0.9rem;
    padding: 6px 12px; 
  }
}
</style>
