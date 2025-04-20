        const cards = document.getElementById('cards');
        const dots = document.querySelectorAll('.dot');
        const prev = document.getElementById('prev');
        const next = document.getElementById('next');
        let currentIndex = 0;
        let interval;
      
        function updateCarousel(index) {
          cards.style.transform = `translateX(-${index * 33.3333}%)`;
          dots.forEach((dot, i) => {
            dot.classList.toggle('scale-[130%]', i === index);
            dot.classList.toggle('bg-white', i === index);
            dot.classList.toggle('bg-gray-400', i !== index);
          });
        }
      
        function goTo(index) {
          currentIndex = (index + 3) % 3; // Loop between 0-2
          updateCarousel(currentIndex);
        }
      
        function nextCard() {
          goTo(currentIndex + 1);
        }
      
        function startAutoSlide() {
          interval = setInterval(nextCard, 3000);
        }
      
        function stopAutoSlide() {
          clearInterval(interval);
        }
      
        // Event Listeners
        dots.forEach((dot, i) => {
          dot.addEventListener('click', () => {
            goTo(i);
            stopAutoSlide();
            startAutoSlide();
          });
        });
      
        prev.addEventListener('click', () => {
          goTo(currentIndex - 1);
          stopAutoSlide();
          startAutoSlide();
        });
      
        next.addEventListener('click', () => {
          nextCard();
          stopAutoSlide();
          startAutoSlide();
        });
      
        // Initialize
        updateCarousel(currentIndex);
        startAutoSlide();