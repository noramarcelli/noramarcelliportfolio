console.log('Books Shop');

var gBooks = [
    { id: 0, name: 'Lala', price: 100 },
    { id: 1, name: 'Ari and Danny', price: 50 },
    { id: 2, name: 'Shula', price: 80 },
    { id: 3, name: 'Gamzu', price: 70 },
    { id: 4, name: 'book 5', price: 120 }
];
var gNextId = 5;

function init() {
    console.log('test');
    renderBooks(gBooks);
    // Dynamic modal
    $('#ReadBookModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var bookId = button.data('book-id') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        var currBook = gBooks.find(function (book) {
            return bookId === book.id;
        });

        modal.find('.modal-title').text('Book ID: #' + bookId)
        modal.find('.modal-body #book-name').val(currBook.name);
        modal.find('.modal-body #book-price').val(currBook.price);
    })
}



function renderBooks(books) {
    var strHtmls = books.map(function (book, idx) {
        var strHtml = `
        <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td class="price book${book.id}">${book.price}</td>
            <td><button class="read btn btn-outline-primary" type="button" data-toggle="modal" data-target="#ReadBookModal" data-book-id="${book.id}" >Read</button></td>
            <td><button class="update btn btn-outline-warning" type="button" onclick="enablePriceUpdate(${book.id})">Update</button></td>
            <td><button class="delete btn btn-outline-danger" type="button" onclick="deleteBook(${book.id})">Delete</button></td>
        </tr>
        `
        return strHtml;
    });
    //data-toggle="modal" data-target="#myModal"
    var $elBooks = $('.books');
    $elBooks.html(strHtmls);
}

function deleteBook(bookId) {
    console.log(bookId);
    var idxToDelete = gBooks.findIndex(function (book) {
        return book.id === bookId;
    });
    gBooks.splice(idxToDelete, 1);
    renderBooks(gBooks);
}

function addBook() {
    var id = gNextId++;
    var name = $('.new-book-name').val(); //prompt('What');
    var price = $('.new-book-price').val();
    var book = { id:id, name:name, price:price };
    gBooks.push(book);
    renderBooks(gBooks);
}

function enablePriceUpdate(bookId) {
    var currBook = gBooks.find(function (book) {
        return book.id === +bookId;
    });
    var $elPriceTd = $(`td.price.book${bookId}`)
    var strHtml = `<input class="new-book-price" type="text" name="newBookPrice"
                    value="${currBook.price}" onkeyup="updateNewPrice(this, event, ${bookId})">` //prompt('New Price?');
    //<input class="new-book-price" type="text" name="newBookPrice" placeholder="Book Price">
    $elPriceTd.html(strHtml)
    // gBooks[idxToUpdate].price = price;
    // renderBooks(gBooks);
}
function updateNewPrice(elInput, event, bookId) {
    if (event.keyCode === 13) {
        var book = gBooks.find(function (book) {
            return book.id === +bookId;
        });
        console.dir(elInput);
        book.price = +elInput.value;
        renderBooks(gBooks);
    }
}

function sortByKey(key) {
    if (key === 'name') {
        gBooks.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0
        });
    } else {
        gBooks.sort(function (a, b) {
            return a[key] - b[key];
        });
        //   console.log(result);
    }
    renderBooks(gBooks);
}

