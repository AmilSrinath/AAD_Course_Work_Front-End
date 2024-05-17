$("#btnSale").on('click',()=>{
    loadItemIds();
})

function loadItemIds() {
    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/sale/getItemIds",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#saleItemIDs").empty();
            $("#saleItemIDs").append(`<option>Select Item</option>`);
            response.map((response) => {
                $("#saleItemIDs").append(`<option value="${response}">${response}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

$("#saleItemSize").prop("disabled", true);

$("#saleItemIDs").on('change',()=>{
    let itemId = $("#saleItemIDs").val();
    setData(itemId);

    if ($("#saleItemIDs").val() === "Select Item") {
        $("#saleItemSize").prop("disabled", true);
    } else {
        $("#saleItemSize").prop("disabled", false);
    }

    setDataSize(itemId);
})


$("#saleItemSize").on('change',()=>{
    let itemId = $("#saleItemIDs").val();
    let itemSize = $("#saleItemSize").val();

    $.ajax({
        url: `http://localhost:8080/Scope/api/v1/size/getDataWithSize/${itemId}/${itemSize}`,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#saleItemPrice").val(response.unit_price_sale);
            $("#saleItemQuantity").val(response.quantity);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
})

function setDataSize(itemId) {
    $.ajax({
        url: `http://localhost:8080/Scope/api/v1/sale/getItemSize/${itemId}`,
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#saleItemSize").empty();
            $("#saleItemSize").append(`<option>Select Size</option>`);
            response.map((response) => {
                $("#saleItemSize").append(`<option value="${response}">${response}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}


function setData(itemId) {
    $.ajax({
        url: `http://localhost:8080/Scope/api/v1/sale/getItem/${itemId}`,
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#saleItemDesc").val(response.item_desc);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}





window.loadItemIds=loadItemIds;