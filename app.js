        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding content
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission handler
        function handleSubmit(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Create mailto link
            const mailtoLink = `mailto:lelybutarbutar0204@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Opening your email client...');
            
            // Reset form
            event.target.reset();
        }

        // Highlight active nav link on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
         // Skill icon interaction
    document.querySelectorAll('.skill-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove active class from all icons
            document.querySelectorAll('.skill-icon').forEach(i => i.classList.remove('active'));
            // Add active class to clicked icon
            this.classList.add('active');
            
            // Optional: Log skill name
            const skillName = this.getAttribute('data-skill');
            console.log('Selected skill:', skillName);
        });
    });
     // Modal Functions
    function openModal(projectId) {
        const modal = document.getElementById('modal-' + projectId);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(projectId) {
        const modal = document.getElementById('modal-' + projectId);
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Close modal with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });
// Intersection Observer untuk animasi saat scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Function untuk menambahkan animasi
function addAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Optional: stop observing setelah animasi
            // observer.unobserve(entry.target);
        }
    });
}

// Create observer
const observer = new IntersectionObserver(addAnimation, observerOptions);

// Observe Section Titles
document.querySelectorAll('.section-title').forEach(title => {
    observer.observe(title);
});

// Observe Portfolio Cards dengan delay
document.querySelectorAll('.portfolio-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe Skills dengan delay per baris (sekitar 6 item per baris)
document.querySelectorAll('.skill-icon').forEach((icon, index) => {
    const row = Math.floor(index / 6); // Asumsi 6 icon per baris
    icon.style.animationDelay = `${row * 0.1}s`;
    observer.observe(icon);
});

// Observe Education Cards
document.querySelectorAll('.education-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    observer.observe(card);
});

// Observe Timeline Items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
    observer.observe(item);
});

// Observe Contact Section
const contactInfo = document.querySelector('.contact-info');
const contactForm = document.querySelector('.contact-form');

if (contactInfo) observer.observe(contactInfo);
if (contactForm) observer.observe(contactForm);

// Optional: Animate on page load for first section
window.addEventListener('load', () => {
    const firstSection = document.querySelector('.hero');
    if (firstSection) {
        firstSection.classList.add('animate');
    }
});

// Smooth reveal animation when scrolling back up
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop < lastScrollTop) {
        // Scrolling up
        document.querySelectorAll('.animate').forEach(el => {
            el.style.opacity = '1';
        });
    }
    
    lastScrollTop = scrollTop;
}, false);
// WhatsApp Form Handler
document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const message = document.getElementById('message').value;
    const phoneNumber = '6282163282837'; // Nomor WA Anda (dengan kode negara, tanpa +)
    
    // Encode message untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Buat WhatsApp link
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Buka WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    document.getElementById('message').value = '';
    
    // Optional: Show success message
    alert('Opening WhatsApp...');
});