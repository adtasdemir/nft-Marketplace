const express = require('express');
const NFTController = require('../controllers/nftController');
const { nftValidationRules, nftFilterValidationRules, validate } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.get('/', nftFilterValidationRules(), validate, NFTController.getAllNfts);
router.get('/:id', NFTController.getNftById);
router.post('/', nftValidationRules(), validate, NFTController.createNft);
router.put('/:id', nftValidationRules(), validate, NFTController.updateNft);
router.delete('/:id', NFTController.deleteNft);

module.exports = router;
