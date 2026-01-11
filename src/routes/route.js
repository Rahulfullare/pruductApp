let express = require("express");
let pctrl = require("../controllers/productCtrl");
let catctrl = require("../controllers/categoryCtrl");

const router = express.Router();

/* PRODUCT ROUTES */
router.get("/", pctrl.homePage);
router.get("/addprod", pctrl.addprodPage);
router.post("/addprod", pctrl.addProduct);
router.get("/viewprod", pctrl.getAllProd);
router.get("/updateprod", pctrl.showUpdatePage);
router.post("/updateprod", pctrl.updateProductFinal);
router.get("/deleteprod", pctrl.deleteProdById);
router.get("/searchprod", pctrl.searchProdByName);



/* CATEGORY ROUTES */
router.get("/addcategory", catctrl.addCategoryPage);
router.post("/addcategory", catctrl.createCategory);
router.get("/viewcategory", catctrl.viewCategory);
router.get("/updatecategory", catctrl.showUpdateCategoryPage);
router.post("/updatecategory", catctrl.updateCategoryFinal);
router.get("/deletecategory", catctrl.deleteCategory);
router.get("/searchcategory", catctrl.searchCategory);

module.exports = router;
