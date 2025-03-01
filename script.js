const initSlider = () => {
    // Select slide buttons, image list and gallery wrapper
    const slideButtons = document.querySelectorAll(".slide-button");
    const imageList = document.querySelector(".image-list");
    const galleryWrap = document.querySelector(".gallary-Wrap");
  
    // Select scrollbar elements
    const scrollbarThumb = document.querySelector(".scrollbar-thumb");
    const scrollbarTrack = document.querySelector(".scrollbar-track");
  
    // Function to update scrollbar thumb position based on imageList scroll progress
    const updateScrollbar = () => {
      const scrollableWidth = imageList.scrollWidth - imageList.clientWidth;
      const scrollProgress = imageList.scrollLeft / scrollableWidth;
      const maxThumbMovement = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
      const thumbLeft = scrollProgress * maxThumbMovement;
      scrollbarThumb.style.left = thumbLeft + "px";
    };
  
    // Listen to scroll events on the image list
    imageList.addEventListener("scroll", updateScrollbar);
  
    // Function to scroll images (when clicking slider buttons)
    const scrollImages = (direction) => {
      const scrollAmount = galleryWrap.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };
  
    // Attach click event listeners to slide buttons
    slideButtons.forEach(button => {
      button.addEventListener("click", () => {
        const direction = button.id === "prev-slide" ? -1 : 1;
        scrollImages(direction);
      });
    });
  
    // --- Draggable Scrollbar Code ---
    let isDragging = false;
    let startX;
    let startScrollLeft;
  
    // When the user presses the mouse down on the thumb
    scrollbarThumb.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      startScrollLeft = imageList.scrollLeft;
      scrollbarThumb.classList.add("dragging"); // optional styling
      // Prevent text selection while dragging
      e.preventDefault();
    });
  
    // When the mouse is moved, if dragging update the scroll position
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      // Determine how far the mouse has moved
      const deltaX = e.clientX - startX;
      // Determine the ratio of scrollable width to thumb movement
      const scrollableWidth = imageList.scrollWidth - imageList.clientWidth;
      const maxThumbMovement = scrollbarTrack.clientWidth - scrollbarThumb.clientWidth;
      const scrollRatio = scrollableWidth / maxThumbMovement;
      imageList.scrollLeft = startScrollLeft + deltaX * scrollRatio;
    });
  
    // When the mouse is released, stop dragging
    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        scrollbarThumb.classList.remove("dragging");
      }
    });
  
    // Function to programmatically update the slide bar scroll position
    const goToSlide = (scrollAmount) => {
      // scrollAmount is the target left position
      imageList.scrollTo({ left: scrollAmount, behavior: "smooth" });
      // You can update the scrollbar after a small delay if needed:
      setTimeout(updateScrollbar, 300);
    };
  
    // Initialize scrollbar thumb position
    updateScrollbar();
  
    // Expose goToSlide globally for testing (optional)
    window.goToSlide = goToSlide;
  };
  
  window.addEventListener("load", initSlider);
  document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navCollapse = document.querySelector(".navbar-collapse");

    hamburger.addEventListener("click", function () {
        this.classList.toggle("active"); // For the animated cross effect
        navCollapse.classList.toggle("show"); // Bootstrap's way to show/hide navbar
    });

    // Close the menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!hamburger.contains(event.target) && !navCollapse.contains(event.target)) {
            hamburger.classList.remove("active");
            navCollapse.classList.remove("show");
        }
    });
});
