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
    let itemCategory = $("input[name='itemCategory']").val();
    let gender = $("input[name='gender']:checked").val();
    let occasion = $("input[name='occasion']:checked").val();
    let itemStatus = $("#itemStatus").val();
    let supplierID = $("#supplierIDs").val();


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

    if (!itemCategory) {
        Swal.fire({
            icon: 'error',
            title: 'Please Check Item Category Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if(!gender){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Gender Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if(!occasion){
        Swal.fire({
            icon: 'error',
            title: 'Please Check Occasion Field',
            text: 'Something went wrong!'
        });
        return;
    }

    if (itemStatus === "Select Status") {
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
    formData.append('category', itemCategory);
    formData.append('status', itemStatus);
    formData.append('gender', gender);
    formData.append('occasion', occasion);
    formData.append('supplier_id', supplierID);

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
                loadItemData();
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

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/supplier/getSupplierIds",
        type: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log(response);
            $("#supplierIDs").empty();
            $("#supplierIDs").append(`<option>Select Supplier</option>`);
            response.map((response) => {
                $("#supplierIDs").append(`<option value="${response}">${response}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}

//set Data for table
const setValue = (response) => {
    $("#item-tbl-body").empty();
    response.map((response) => {

        let imageSrc = `data:image/jpeg;base64,${response.item_pic}`;

        let recode = `<tr>
                                <td>
                                    <div id="imageContainer">
                                        <img src="${imageSrc}" class="avatar avatar-xl me-1 border-radius-lg" alt="user1">
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex flex-column justify-content-center">
                                        <h6 id="item-code" class="mb-0 text-sm">${response.item_code}</h6>
                                        <p id="email" class="text-xs text-secondary mb-0 font-weight-bold">${response.item_desc}</p>
                                    </div>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${response.category}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${response.occasion}</span>
                                </td>
                                <td class="align-middle text-center">
                                    <span class="text-secondary text-xs font-weight-bold">${response.gender}</span>
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

//Row Click
let index;
$("#item-tbl-body").on("click","tr", function () {
    index = $(this).index();
    let itemCode = $(this).find("#item-code").text();

    $.ajax({
        url: "http://localhost:8080/Scope/api/v1/inventory/selectInventory",
        type: "GET",
        data: { item_code: itemCode },
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            setData(response);
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
});

function setData(response) {
    $("input[name='itemName']").focus();
    $("input[name='itemName']").val(response.item_desc);

    $("input[name='itemQuantity']").focus();
    $("input[name='itemQuantity']").val(response.item_qty);

    $("input[name='itemCategory']").focus();
    $("input[name='itemCategory']").val(response.category);

    $("input[name='itemSize']").focus();
    $("input[name='itemSize']").val(response.size);

    $("input[name='itemUnitPrice-Sale']").focus();
    $("input[name='itemUnitPrice-Sale']").val(response.unit_price_sale);

    $("input[name='itemUnitPrice-Buy']").focus();
    $("input[name='itemUnitPrice-Buy']").val(response.unit_price_buy);

    $("input[name='itemExpectedProfit']").focus();
    $("input[name='itemExpectedProfit']").val(response.expected_profit);

    $("input[name='itemProfitMargin']").focus();
    $("input[name='itemProfitMargin']").val(response.profit_margin);

    $("input[name='itemStatus']").focus();
    $("input[name='itemStatus']").val(response.status);
}

$("#btnItemUpdate").on('click', () => {
    document.getElementById("itemForm").reset();
})


//Delete Item
function deleteItem(event) {
    event.stopPropagation(); // Stop event propagation
    let itemID = $(event.target).closest("tr").find("#item-code").text();
    console.log(itemID);

    var formData = new FormData();
    formData.append('item_code', itemID);

    Swal.fire({
        title: 'Are you sure?',
        text: "You want delete row?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:8080/Scope/api/v1/inventory/delete",
                type: "DELETE",
                processData: false,
                contentType: false,
                data: formData,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                success: function (response) {
                    Swal.fire(
                        'Deleted!',
                        `${itemID} has been deleted.`,
                        'success'
                    )
                    loadItemData();
                },
                error: function (xhr, status, error) {
                    console.error("Error:", xhr.status);
                    if (xhr.status === 403) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Only an Admin has access to delete inventory (:',
                            text: 'Something went wrong!'
                        })
                    }
                }
            });
        }
    });
    loadItemData();
}

window.deleteItem=deleteItem;
window.loadItemData=loadItemData;
window.itemImageUploaded=itemImageUploaded;