document.addEventListener('DOMContentLoaded', function() {
    var filterForm = document.getElementById('filter-form');
    var searchList = document.getElementById('search-list');
    var clearBtn = document.getElementById('clear-btn');

    function addToList(text) {
        var li = document.createElement('li');
        li.textContent = text;
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

        searchList.innerHTML = '';
        for (var key in filters) {
            if (filters.hasOwnProperty(key)) {
                filters[key].forEach(function(value) {
                    addToList(key + ': ' + value);
                });
            }
        }
    });

    clearBtn.addEventListener('click', function() {
        searchList.innerHTML = '';
    });
});