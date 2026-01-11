let model_cat = require("../models/categorymodel.js");


exports.addCategoryPage = (req, res) => {
    res.render("addcategory.ejs", { msg: "" });
};


exports.createCategory = (req, res) => {
    let { cname } = req.body;

    if (!cname) {
        return res.render("addcategory.ejs", {
            msg: "Category name is required"
        });
    }

    model_cat.CreateCategoryAdd(cname)
        .then(() => {
            res.render("addcategory.ejs", {
                msg: "Category added successfully"
            });
        })
        .catch(() => {
            res.render("addcategory.ejs", {
                msg: "Category already exists"
            });
        });
};

exports.viewCategory = (req, res) => {
    model_cat.getViewCategory()
        .then((result) => {
            res.render("viewcategory.ejs", { catList: result });
        })
        .catch(() => {
            res.send("No category found");
        });
};

exports.showUpdateCategoryPage = (req, res) => {
    let { cid, cname } = req.query;

    res.render("updatecategory.ejs", {
        id: cid,
        name: cname
    });
};


exports.updateCategoryFinal = (req, res) => {
    let { id, cname } = req.body;

    model_cat.CategoryUpdate(id, cname)
        .then(() => model_cat.getViewCategory())
        .then((result) => {
            res.render("viewcategory.ejs", { catList: result });
        })
        .catch(() => {
            res.send("Category not updated");
        });
};


exports.deleteCategory = (req, res) => {
    let id = req.query.id;

    model_cat.CategoryDelete(id)
        .then(() => model_cat.getViewCategory())
        .then((result) => {
            res.render("viewcategory.ejs", { catList: result });
        })
        .catch(() => {
            res.send("Category not deleted");
        });
};


exports.searchCategory = (req, res) => {
    let name = req.query.name;

    model_cat.categorysearch(name)
        .then((result) => {
            res.render("viewcategory.ejs", { catList: result });
        })
        .catch(() => {
            res.send("No category found");
        });
};
