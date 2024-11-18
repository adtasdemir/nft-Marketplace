<template>
  <v-app>
    <!-- Fixed Navbar -->
    <v-app-bar app>
      <v-img 
        src="@/assets/logo.png" 
        alt="NFT Marketplace Logo" 
        height="50" 
        class="mr-4" 
      ></v-img>

      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon @click="drawer = !drawer" class="d-sm-none">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <!-- Filters Section -->
        <v-row no-gutters>
          <v-col cols="12" md="9">
            <v-row dense>
              <v-col cols="6" sm="3">
                <v-select
                  v-model="filters.type"
                  :items="['image', 'video']"
                  label="Type"
                  dense
                  outlined
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field
                  v-model="filters.minPrice"
                  label="Min Price"
                  type="number"
                  dense
                  outlined
                  @change="onMinPriceChange"
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-text-field
                  v-model="filters.maxPrice"
                  label="Max Price"
                  type="number"
                  dense
                  outlined
                />
              </v-col>
              <v-col cols="6" sm="3">
                <v-select
                  v-model="filters.sortBy"
                  :items="sortOptions"
                  item-title="title"
                  item-value="value"
                  label="Sort By"
                  dense
                  outlined
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="3" class="d-flex align-center justify-end">
            <v-btn color="primary" class="mr-2" @click="fetchNFTs">Search</v-btn>
            <v-btn outlined color="secondary" @click="clearFilters">Clear</v-btn>
          </v-col>
        </v-row>

        <!-- NFT Listings -->
        <v-row>
          <template v-if="nfts.length">
            <v-col v-for="nft in nfts" :key="nft.id" cols="12" md="4">
              <NFTCard :nft="nft" />
            </v-col>
          </template>
          <template v-else>
            <v-col cols="12" class="text-center">
              <v-alert type="info">No products found</v-alert>
            </v-col>
          </template>
        </v-row>

        <!-- Pagination -->
        <Pagination 
        :currentPage="page" 
          :totalPages="totalPages" 
          @page-changed="onPageChanged" 
        />

      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <span>&copy; 2024 NFT Marketplace</span>
    </v-footer>
  </v-app>
</template>

<script>
import NFTCard from '@/components/NFTCard.vue';
import nftApi from '@/api/nfts';
import Pagination from '@/components/PaginationBar.vue';

export default {
  components: { NFTCard, Pagination },
  data() {
    return {
      nfts: [], 
      page: 1,
      filters: {
        type: '',       
        minPrice: '',   
        maxPrice: '',   
        sortBy: '',    
      },
      totalPages: 0, 
      drawer: false, 
      sortOptions: [
        { title: 'Expensive to Cheap', value: 'price_desc' },
        { title: 'Cheap to Expensive', value: 'price_asc' },
        { title: 'Old Date to New', value: 'createdAt_asc' },
        { title: 'New Date to Old', value: 'createdAt_desc' },
      ],
    };
  },
  methods: {
    async fetchNFTs() {
      try {
        let sortField = '';
        let order = '';

        if (this.filters.sortBy === 'price_desc' || this.filters.sortBy === 'price_asc') {
          sortField = 'price';
          order = this.filters.sortBy === 'price_desc' ? 'DESC' : 'ASC';
        } else if (this.filters.sortBy === 'createdAt_desc' || this.filters.sortBy === 'createdAt_asc') {
          sortField = 'createdAt';
          order = this.filters.sortBy === 'createdAt_desc' ? 'DESC' : 'ASC';
        }

        const params = {
          page: this.page,
          perPage: 10,
          type: this.filters.type || undefined,
          minPrice: this.filters.minPrice || undefined,
          maxPrice: this.filters.maxPrice || undefined,
          sortBy: sortField || undefined,
          order: order || undefined, 
        };

        const response = await nftApi.getAllNfts(params);
        this.nfts = response.data.data;
        this.totalPages = response.data.pagination.totalPages;
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    },

    onMinPriceChange() {
      if (this.filters.minPrice <= 0) {
        this.filters.minPrice = 1;
      }
    },

    clearFilters() {
      this.filters = {
        type: '',
        minPrice: '',
        maxPrice: '',
        sortBy: '',
      };
      this.page = 1;
      this.fetchNFTs();
    },

    onPageChanged(page) {
      this.page = page;
      this.fetchNFTs();
    },
  },
  mounted() {
    this.fetchNFTs();
  },
};
</script>

<style scoped>
.v-app-bar {
  background-color: #2C3E50;
  color: white;
}

.v-footer {
  background-color: #2C3E50;
  color: white;
  text-align: center;
}

.v-row {
  margin-top: 20px;
}
</style>
