let searchProd = (str) => {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            let jsonObj = JSON.parse(this.responseText);

            let tableBody = document.getElementById("tblBody");
            tableBody.innerHTML = "";

            jsonObj.forEach((element, index) => {

                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${element.pname}</td>
                    <td>${element.cname}</td>
                    <td>${element.price}</td>
                    <td>${element.stock}</td>
                    <td>
                        <a href="/deleteprod?id=${element.pid}"
                           onclick="return confirm('Delete product?')">
                           DELETE
                        </a>
                    </td>
                    <td>
                        <a href="/updateprod
                            ?pid=${element.pid}
                            &pname=${element.pname}
                            &price=${element.price}
                            &cid=${element.cid}
                            &stock=${element.stock}">
                            UPDATE
                        </a>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }
    };

    xhttp.open("GET", "/searchprod?name=" + str, true);
    xhttp.send();
};
