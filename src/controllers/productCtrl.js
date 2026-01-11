let pmodel = require("../models/productmodel.js");
let catmodel = require("../models/categorymodel.js");

/* ================= HOME ================= */
exports.homePage = (req, res) => {
    res.render("home.ejs");
};

/* ================= ADD PRODUCT PAGE ================= */
exports.addprodPage = async (req, res) => {
    try {
        const categories = await catmodel.getViewCategory();
        res.render("addprod.ejs", {
            msg: "",
            catList: categories
        });
    } catch {
        res.render("addprod.ejs", {
            msg: "Failed to load categories",
            catList: []
        });
    }
};

/* ================= ADD PRODUCT ================= */
exports.addProduct = async (req, res) => {
    let { pname, price, cid, stock } = req.body;

    try {
        await pmodel.saveProduct(pname, price, cid, stock);
        res.redirect("/viewprod");
    } catch (err) {
        const categories = await catmodel.getViewCategory();
        res.render("addprod.ejs", {
            msg: err.message,
            catList: categories
        });
    }
};

/* ================= VIEW PRODUCTS (PAGINATION) ================= */
exports.getAllProd = async (req, res) => {
    try {
        const pageSize = 10;
        const currentPage = parseInt(req.query.page) || 1;
        const offset = (currentPage - 1) * pageSize;

        const totalCount = await pmodel.getTotalProductCount();
        const totalPages = Math.ceil(totalCount / pageSize);

        const products = await pmodel.getProductsWithPagination(pageSize, offset);

        res.render("viewprod.ejs", {
            prodList: products,
            currentPage,
            totalPages
        });
    } catch {
        res.send("Error loading products");
    }
};

/* ================= UPDATE PRODUCT PAGE ================= */
exports.showUpdatePage = (req, res) => {
    let { pid, pname, price, cid, stock } = req.query;

    res.render("updateprod.ejs", {
        id: pid,
        name: pname,
        price,
        category: cid,
        qty: stock
    });
};

/* ================= UPDATE PRODUCT ================= */
exports.updateProductFinal = async (req, res) => {
    let { id, name, price, category } = req.body;

    try {
        await pmodel.updateProdById(id, name, price, category);

        const result = await pmodel.viewProducts();
        res.render("viewprod.ejs", {
            prodList: result,
            currentPage: 1,
            totalPages: 1
        });
    } catch {
        res.send("Product not updated");
    }
};

/* ================= DELETE PRODUCT ================= */
exports.deleteProdById = async (req, res) => {
    let id = parseInt(req.query.id);

    try {
        await pmodel.deleteProdById(id);
        const result = await pmodel.viewProducts();

        res.render("viewprod.ejs", {
            prodList: result,
            currentPage: 1,
            totalPages: 1
        });
    } catch {
        res.send("Product not deleted");
    }
};

/* ================= SEARCH PRODUCT ================= */
exports.searchProdByName = async (req, res) => {
    let name = req.query.name || "";

    try {
        const result = await pmodel.searchProdByName(name);
        res.json(result);
    } catch {
        res.json([]);
    }
};
