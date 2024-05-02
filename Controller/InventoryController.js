//Image to Base64
let itemImageBase64 = "";
function itemImageUploaded() {
    let file = document.querySelector('input[name=itemPic]').files[0];
    let reader = new FileReader();
    reader.onload = function () {
        itemImageBase64 = reader.result.replace("data:", "").replace(/^.+,/, "");
    }
    reader.readAsDataURL(file);
}

//Save
$("#btnItemSave").on('click', () => {
    let itemName = $("input[name='itemName']").val();
    let itemPic = $("input[name='itemPic']").val();
    let itemQuantity = $("input[name='itemQuantity']").val();
    let itemCategory = $("input[name='itemCategory']").val();
    let itemSize = $("input[name='itemSize']").val();
    let itemUnitPriceSale = $("input[name='itemUnitPrice-Sale']").val();
    let itemUnitPriceBuy = $("input[name='itemUnitPrice-Buy']").val();
    let itemExpectedProfit = $("input[name='itemExpectedProfit']").val();
    let itemProfitMargin = $("input[name='itemProfitMargin']").val();
    let itemStatus = $("input[name='itemStatus']").val();

    if (!itemName) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Name Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemPic) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Picture Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemQuantity) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Quantity Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemCategory) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Category Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemSize) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Size Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemUnitPriceSale) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Unit Price Sale Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemUnitPriceBuy) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Unit Price Buy Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemExpectedProfit) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Expected Profit Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemProfitMargin) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Profit Margin Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemStatus) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Status Field',
            text: 'Something went wrong!'
        });
        return;
    }

    var formData = new FormData();

    formData.append('item_desc', itemName);
    formData.append('item_pic', itemImageBase64);
    formData.append('item_qty', itemQuantity);
    formData.append('category', itemCategory);
    formData.append('size', itemSize);
    formData.append('unit_price_sale', itemUnitPriceSale);
    formData.append('unit_price_buy', itemUnitPriceBuy);
    formData.append('expected_profit', itemExpectedProfit);
    formData.append('profit_margin', itemProfitMargin);
    formData.append('status', itemStatus);

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/inventory/save",
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            Swal.fire(
                'Saved!',
                'Item has been saved.',
                'success'
            ).then(() => {
                //window.location.reload();
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
});

//Get All Data
function loadItemData() {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/inventory",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            setValue(response);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

//set Data for table
const setValue = (response) => {
    $("#employee-tbl-body").empty();
    response.map((response) => {

        let imageSrc = `data:image/jpeg;base64,${response.item_pic}`;

        let recode = `<tr>
                                <td>
                                    <div id="imageContainer">
                                        <img src="${imageSrc}" class="avatar avatar-xl me-1 border-radius-lg" alt="user1">
                                    </div>
                                </td>
                                <td>
                                    <span class="text-secondary text-xs font-weight-bold">${response.item_desc}</span>
                                </td>
                                <td>
                                    <span class="text-secondary text-xs font-weight-bold">${response.item_qty}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${response.category}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${response.size}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${response.unit_price_sale}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${response.unit_price_buy}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${response.expected_profit}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${response.profit_margin}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${response.status}</span>
                                </td>
                                <td>
                                    <i id="delteIcon" class="fa-solid fa-trash fa-xl hand-cursor ms-2" onclick="deleteItem(event)"></i>
                                </td>
                            </tr>`

        $("#item-tbl-body").append(recode);
    })
}


















window.loadItemData=loadItemData;
window.itemImageUploaded=itemImageUploaded;