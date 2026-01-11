let db=require("../../db.js");

exports.saveProduct = (pname, price, cid, stock) => {
    return new Promise((resolve, reject) => {

        //  Check for duplicate product name
        const checkSql = "SELECT pid FROM product WHERE pname = ?";
        db.query(checkSql, [pname], (err, results) => {
            if (err) return reject(err);

            if (results.length > 0) {
                return reject(new Error("Product name already exists"));
            }

            //  Insert new product
            const insertSql = "INSERT INTO product(pname, price, cid, stock) VALUES (?, ?, ?, ?)";
            db.query(insertSql, [pname, price, cid, stock], (err2, result) => {
                if (err2) reject(err2);
                else resolve(result);
            });
        });
    });
};

exports.viewProducts = () => {
    return new Promise((resolve, reject) => {
        let sql = `
        SELECT 
            p.pid,
            p.pname,
            p.price,
            p.stock,
            c.cid,
            c.cname
        FROM product p
        LEFT JOIN category c ON p.cid = c.cid
        `;
        db.query(sql, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};



exports.updateProdById = (id, pname, price, cid) => {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE product SET pname=?, price=?, cid=? WHERE pid=?",
            [pname, price, cid, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};
exports.deleteProdById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM product WHERE pid = ?",
      [id],
      (err, result) => {
        if (err) return reject(err); 
        resolve(result);
      }
    );
  });
};

exports.searchProdByName = (name) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT 
                p.pid,
                p.pname,
                p.price,
                p.stock,
                p.cid,
                c.cname
             FROM product p
             LEFT JOIN category c ON p.cid = c.cid
             WHERE p.pname LIKE ?`,
            [`%${name}%`],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};

exports.getProductsWithPagination = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT p.pid, p.pname, p.price, p.stock, c.cname, p.cid
             FROM product p
             JOIN category c ON p.cid = c.cid
             LIMIT ? OFFSET ?`,
            [limit, offset],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};

exports.getTotalProductCount = () => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT COUNT(*) AS total FROM product",
            (err, result) => {
                if (err) reject(err);
                else resolve(result[0].total);
            }
        );
    });
};