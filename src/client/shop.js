function clearList() {
    document.getElementById('search-list').innerHTML = '';
}

document.getElementById('search-input').addEventListener('input', function() {
    var inputText = this.value.toLowerCase();
    var searchList = document.getElementById('search-list');
    searchList.innerHTML = ''; // Clear previous list items

    // Example list of names
    var names = ['John', 'Doe', 'Jane', 'Smith'];

    names.forEach(function(name) {
        if (name.toLowerCase().includes(inputText)) {
            var li = document.createElement('li');
            li.textContent = name;
            searchList.appendChild(li);
        }
    });
});