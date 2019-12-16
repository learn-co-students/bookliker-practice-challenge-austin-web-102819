let init = () => {
	function getBooks() {
		// alert('in');
		const url = 'http://localhost:3000/books';
		fetch(url)
			.then((response) => response.json())
			.then((books) => {
				// sendToGlobalVariable(books);
				displayBooks(books);
			});
	}

	function displayBooks(books) {
		const list = document.getElementById('list');
		for (const book in books) {
			const li = document.createElement('li');
			li.id = books[book].id;
			li.innerText = books[book].title;
			li.addEventListener('click', () => showBookInfo(books[book]));
			list.appendChild(li);
		}
	}

	function showBookInfo(book) {
		console.log(book);

		const showPanel = document.getElementById('show-panel');
		showPanel.innerHTML = '';
		const img = document.createElement('img');
		const p = document.createElement('p');
		const ul = document.createElement('ul');

		img.src = book.img_url;
		p.innerText = book.description;
		let foundMe = false;
		for (const user in book.users) {
			const li = document.createElement('li');
			li.innerText = book.users[user].username;
			if (book.users[user].id === 1) foundMe = true;
			ul.appendChild(li);
		}
		const like = document.createElement('button');
		foundMe ? (like.innerText = 'Remove Like') : (like.innerText = 'Like');
		like.addEventListener('click', (event) => likeBook(book, ul));

		showPanel.appendChild(img);
		showPanel.appendChild(p);
		showPanel.appendChild(ul);
		showPanel.appendChild(like);
	}

	function likeBook(book, ul) {
		ul.innerHTML = '';
		const user = { id: 1, username: 'pouros' };
		console.log(book.users[Object(book.users).length - 1].id);
		if (1 === book.users[Object(book.users).length - 1].id) {
			book.users.pop();
		} else {
			book.users.push(user);
		}

		var data = book;
		configObject = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		};
		fetch(`http://localhost:3000/books/${book.id}`, configObject);
	}

	getBooks();
};

document.addEventListener('DOMContentLoaded', init);
