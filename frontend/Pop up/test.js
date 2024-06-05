document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const openPopupBtn = document.getElementById('open-popup-btn');
    const closeBtn = document.getElementById('close-btn');

    // Function to open the pop-up
    function openPopup() {
        popup.style.display = 'flex'; // Use 'flex' to center align the pop-up
    }

    // Function to close the pop-up
    function closePopup() {
        popup.style.display = 'none';
    }

    // Event listeners for open and close buttons
    openPopupBtn.addEventListener('click', openPopup);
    closeBtn.addEventListener('click', closePopup);

    // Close the pop-up if user clicks outside of the pop-up content
    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            closePopup();
        }
    });
});


