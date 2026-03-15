document.addEventListener("DOMContentLoaded", function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Active class toggle
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            productItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                } else if (item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
});