//Save
$("#btnSizeSave").on('click', () => {
    let itemID = $("select[name='itemID']").val();
    let itemQuantity = $("input[name='itemQuantity']").val();
    let itemSize = $("input[name='itemSize']").val();
    let itemProfitMargin = $("input[name='itemProfitMargin']").val();
    let itemUnitPriceSale = $("input[name='itemUnitPrice-Sale']").val();
    let itemUnitPriceBuy = $("input[name='itemUnitPrice-Buy']").val();
    let itemExpectedProfit = $("input[name='itemExpectedProfit']").val();


    if (itemID==="Select Item") {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item ID Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemQuantity) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Quantity Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemSize) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Size Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemProfitMargin) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Profit Margin Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemUnitPriceSale) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Unit Price Sale Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemUnitPriceBuy) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Unit Price Buy Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (!itemExpectedProfit) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Expected Profit Field',
            text: 'Something went wrong!'
        });
        return;
    }


    let sizeDate = {
        item_code: itemID,
        quantity: itemQuantity,
        size: itemSize,
        profit_margin: itemProfitMargin,
        unit_price_sale: itemUnitPriceSale,
        unit_price_buy: itemUnitPriceBuy,
        expected_profit: itemExpectedProfit
    };

    let jsonData = JSON.stringify(sizeDate);

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/size/save",
        type: "POST",
        contentType: 'application/json',
        data: jsonData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log("Success:", response);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Size Saved Successfully',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Size Already Added',
                    showConfirmButton: false,
                    timer: 2000
                });
            }

            loadSizeData();
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });

});

function loadSizeData() {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/size",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log(response);
            $("#size-tbl-body").empty();
            let recode = `<tr class="me-6">
                                <td>${response.size_id}</td>
                                <td>${response.quantity}</td>
                                <td>${response.quantity}</td>
                                <td>
                                    <i id="delteCustomerIcon" class="fa-solid fa-trash fa-xl hand-cursor ms-2" onclick="deleteCustomer(event)"></i>
                                </td>
                            </tr>`
                $("#size-tbl-body").append(recode);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

$("#itemID").on('click', function () {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/size/getItemIds",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log(response);
            $("#itemID").empty();
            $("#itemID").append(`<option>Select Item</option>`);
            response.map((response) => {
                $("#itemID").append(`<option value="${response}">${response}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
})

window.loadSizeData=loadSizeData;