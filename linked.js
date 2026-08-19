class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
    }

    add(data) {
        const newNode = new ListNode(data);
        if (this.head === null) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
    }

    display() {
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";
        let current = this.head;
        let grandTotal = 0;

        if (current === null) {
            tableBody.innerHTML = "<tr><td colspan='6'>No item records available.</td></tr>";
        }

        while (current !== null) {
            const item = current.data;
            const totalPrice = item.qty * item.price;
            grandTotal += totalPrice;

            tableBody.innerHTML += "<tr>" +
                "<td>" + item.ctr + "</td>" +
                "<td>" + item.name + "</td>" +
                "<td>" + item.qty + "</td>" +
                "<td>" + item.price + "</td>" +
                "<td>" + totalPrice + "</td>" +
                "<td><button onclick='editItem(" + item.ctr + ")'>Update</button> " +
                "<button onclick='deleteItem(" + item.ctr + ")'>Delete</button></td></tr>";

            current = current.next;
        }

        document.getElementById("grandTotal").innerText = grandTotal;
    }
}

const itemList = new LinkedList();
let nextCtr = 10001;
let editingCtr = null;

function addItem() {
    const name = document.getElementById("itemName").value;
    const qtyText = document.getElementById("quantity").value;
    const priceText = document.getElementById("price").value;

    const qty = parseFloat(qtyText);
    const price = parseFloat(priceText);

    if (name.trim() === "") {
        document.getElementById("message").innerText = "Please enter the item name.";
        return;
    }
    if (qtyText === "" || qty <= 0) {
        document.getElementById("message").innerText = "Quantity must be greater than zero.";
        return;
    }
    if (priceText === "" || price <= 0) {
        document.getElementById("message").innerText = "Price must be greater than zero.";
        return;
    }

    if (editingCtr === null) {
        itemList.add({ ctr: nextCtr, name: name, qty: qty, price: price });
        document.getElementById("message").innerText = "Record " + nextCtr + " was added successfully.";
        nextCtr++;
    } else {
        let current = itemList.head;
        while (current !== null) {
            if (current.data.ctr === editingCtr) {
                current.data.name = name;
                current.data.qty = qty;
                current.data.price = price;
            }
            current = current.next;
        }
        document.getElementById("message").innerText = "Record " + editingCtr + " was updated successfully.";
        editingCtr = null;
        document.getElementById("formButtons").innerHTML = "<button onclick='addItem()'>Add Item</button>";
    }

    document.getElementById("itemName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    itemList.display();
}

function editItem(ctr) {
    let current = itemList.head;
    while (current !== null) {
        if (current.data.ctr === ctr) {
            document.getElementById("itemName").value = current.data.name;
            document.getElementById("quantity").value = current.data.qty;
            document.getElementById("price").value = current.data.price;
        }
        current = current.next;
    }

    editingCtr = ctr;
    document.getElementById("message").innerText = "You are updating record " + ctr + ".";
    document.getElementById("formButtons").innerHTML =
        "<button onclick='addItem()'>Save Update</button> " +
        "<button onclick='cancelUpdate()'>Cancel Update</button>";
}

function cancelUpdate() {
    editingCtr = null;
    document.getElementById("itemName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("message").innerText = "Update was cancelled.";
    document.getElementById("formButtons").innerHTML = "<button onclick='addItem()'>Add Item</button>";
}

function deleteItem(ctr) {
    if (itemList.head !== null && itemList.head.data.ctr === ctr) {
        itemList.head = itemList.head.next;
    } else {
        let current = itemList.head;
        while (current !== null && current.next !== null) {
            if (current.next.data.ctr === ctr) {
                current.next = current.next.next;
                break;
            }
            current = current.next;
        }
    }
    document.getElementById("message").innerText = "Record " + ctr + " was deleted successfully.";
    itemList.display();
}

itemList.display();
