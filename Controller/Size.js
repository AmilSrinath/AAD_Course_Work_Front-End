function loadSizeData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/size",
        success: function (response) {
            $("#size-tbl-body").empty();
            response.map((response) => {
                let recode = `<tr class="me-6">
                                <td>${response.size_id}</td>
                                <td>${response.quantity}</td>
                                <td>${response.item_id}</td>
                                <td>
                                    <i id="delteCustomerIcon" class="fa-solid fa-trash fa-xl hand-cursor ms-2" onclick="deleteCustomer(event)"></i>
                                </td>
                            </tr>`
                $("#customer-tbl-body").append(recode);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}



