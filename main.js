console.log("main.js is connected!");

document.addEventListener("DOMContentLoaded", function () {
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillsSection = document.getElementById('skills');

  function showSkillBars() {
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      skillBars.forEach(bar => {
        if (!bar.classList.contains('visible')) {
          bar.classList.add('visible');
          const barFill = bar.querySelector('.bar-fill');
          const width = bar.getAttribute('data-width');
          barFill.style.width = width + '%';
        }
      });
    } else {
      // Reset animation when section is out of view
      skillBars.forEach(bar => {
        bar.classList.remove('visible');
        const barFill = bar.querySelector('.bar-fill');
        barFill.style.width = '0';
      });
    }
  }

  window.addEventListener('scroll', showSkillBars);

  // Also trigger when clicking navbar link
  document.querySelectorAll('.nav-links a[href="#skills"]').forEach(link => {
    link.addEventListener('click', function () {
      setTimeout(showSkillBars, 400); // Wait for scroll to finish
    });
  });

  showSkillBars(); // Initial check

  // Contact form animation
  const contactForm = document.getElementById('contact-form');
  const thankYouMessage = document.getElementById('thank-you-message');
  const sendAnotherBtn = document.getElementById('send-another');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Send form data to Formspree
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          contactForm.style.display = 'none';
          thankYouMessage.style.display = 'block';
        } else {
          alert('There was an error sending your message. Please try again.');
        }
      })
      .catch(() => {
        alert('There was an error sending your message. Please try again.');
      });
    });
  }

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', function () {
      contactForm.reset();
      contactForm.style.display = 'block';
      thankYouMessage.style.display = 'none';
    });
  }

  // Portfolio fade-in animation
  const projectBoxes = document.querySelectorAll('.project-box');
  const portfolioSection = document.getElementById('portfolio');

  function showProjectBoxes() {
    const rect = portfolioSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      projectBoxes.forEach(box => {
        if (!box.classList.contains('visible')) {
          box.classList.add('visible');
        }
      });
    } else {
      projectBoxes.forEach(box => {
        box.classList.remove('visible');
      });
    }
  }

  window.addEventListener('scroll', showProjectBoxes);

  // Trigger animation when clicking navbar link
  document.querySelectorAll('.nav-links a[href="#portfolio"]').forEach(link => {
    link.addEventListener('click', function () {
      setTimeout(showProjectBoxes, 400); // Wait for scroll to finish
    });
  });

  showProjectBoxes(); // Initial check
});
