document.addEventListener('DOMContentLoaded', () => {
  const myLibrary = [];

  const addBookButton = document.querySelector('.btnAddBook');
  const cancelButton = document.querySelector('#cancel-button');
  const bookWindow = document.querySelector('.hiddenUntilBtnClick');
  const submitButton = document.querySelector('#submit-button');
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const pagesInput = document.querySelector('#pages');
  const readStatus = document.querySelector('#read-status');
  const buttonBook = document.querySelector('.buttonBook');

  function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  function validateInputs(title, author, pages) {
    if (!title.trim() || !author.trim()) {
      return 'Title and author are required.';
    }
    if (!/^[0-9]+$/.test(pages) || parseInt(pages) <= 0) {
      return 'Pages must be a positive number.';
    }
    return '';
  }

  function addBookToLibrary(title, author, pages, readStatus) {
    const validationError = validateInputs(title, author, pages);
    if (validationError) {
      alert(validationError);
      return;
    }

    myLibrary.push(new Book(title, author, pages, readStatus));

    let newDiv = document.createElement('div');
    newDiv.classList.add('book');

    addFieldToBook('Title:', title, newDiv);
    addFieldToBook('Author:', author, newDiv);
    addFieldToBook('Pages :', pages, newDiv);

    let uniqueValue = Date.now();
    let readStatusDiv = document.createElement('div');
    newDiv.appendChild(readStatusDiv);
    let readStatusCheckbox = document.createElement('input');
    readStatusCheckbox.setAttribute('type', 'checkbox');
    readStatusCheckbox.setAttribute('id', 'read-status' + uniqueValue);
    readStatusCheckbox.checked = readStatus;
    readStatusDiv.appendChild(readStatusCheckbox);
    let readStatusLabel = document.createElement('label');
    readStatusLabel.setAttribute('for', 'read-status' + uniqueValue);
    readStatusLabel.textContent = readStatus
      ? 'Already finished'
      : "Haven't read yet";
    readStatusCheckbox.addEventListener('click', function () {
      readStatusLabel.textContent = readStatusCheckbox.checked
        ? 'Already finished'
        : "Haven't read yet";
    });
    readStatusDiv.appendChild(readStatusLabel);

    let newButton = document.createElement('button');
    newButton.textContent = 'Remove';
    newDiv.appendChild(newButton);
    newButton.addEventListener('click', function () {
      newDiv.remove();
    });

    buttonBook.insertBefore(newDiv, addBookButton);

    hideBookWindow();
    resetInputFields();
  }

  function resetInputFields() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readStatus.checked = false;
  }

  function addFieldToBook(title, data, divChoosen) {
    let newtitle = document.createElement('h4');
    newtitle.textContent = title;
    let newP = document.createElement('p');
    newP.textContent = data;
    divChoosen.appendChild(newtitle);
    divChoosen.appendChild(newP);
  }

  function displayBookWindow() {
    bookWindow.style.display = 'block';
  }

  function hideBookWindow() {
    bookWindow.style.display = 'none';
  }

  addBookButton.addEventListener('click', function () {
    displayBookWindow();
  });

  cancelButton.addEventListener('click', function () {
    hideBookWindow();
  });

  submitButton.addEventListener('click', function () {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readStatus.checked
    );
  });
});
