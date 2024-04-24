
document.addEventListener('DOMContentLoaded', function() {
    var filterForm = document.getElementById('filter-form');
    var searchList = document.getElementById('search-list');
    var clearBtn = document.getElementById('clear-btn');

    function addToList(item) {
        var li = document.createElement('li');
        li.textContent = item;
        searchList.appendChild(li);
    }

    filterForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        var filters = {};

     
        var checkboxes = filterForm.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(function(checkbox) {
            var name = checkbox.name;
            var value = checkbox.value;
            if (!filters[name]) {
                filters[name] = [];
            }
            filters[name].push(value);
        });

        searchList.innerHTML = ''; // Clear previous list items
        var items = ['Pants', 'Shirt', 'Dress', 'Jacket']; // Example 
        items.forEach(function(item) {
            var displayItem = item;
            if (Object.keys(filters).length > 0) {
                displayItem += ' [' + Object.entries(filters).map(([key, value]) => key + ': ' + value.join(', ')).join(', ') + ']';
            }
            addToList(displayItem);
        });
    });

    clearBtn.addEventListener('click', function() {
        searchList.innerHTML = '';
    });
});
