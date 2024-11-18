<template>
  <v-container>
    <v-img v-if="nft" :src="nft.image" alt="NFT Image" />
    <h1 v-if="nft">{{ nft.title }}</h1>
    <p v-if="nft">{{ nft.description }}</p>
    <v-btn color="primary" @click="buyNFT(nft.id)">Buy Now</v-btn>
  </v-container>
</template>

<script>
import nftApi from '@/api/nfts';

export default {
  name: "DetailPage",
  data() {
    return {
      nft: null,
    };
  },
  async created() {
    try {
      const nftId = this.$route.params.id; 
      const response = await nftApi.getNftById(nftId); 
      this.nft = response.data; 
    } catch (error) {
      console.error("Failed to fetch NFT details:", error);
    }
  },
  methods: {
    buyNFT(id) {
      console.log("Buying NFT with id:", id);
    },
  },
};
</script>
