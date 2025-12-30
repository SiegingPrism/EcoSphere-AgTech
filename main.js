/* Main JavaScript for EcoSphere */

document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initNavbar();
    injectModal();
});

/* --- Navigation & Scroll Effects --- */
function initNavbar() {
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

function initScrollEffects() {
    window.addEventListener('scroll', reveal);
    reveal(); // Trigger once on load
}

function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
    }
}

/* --- Contact Modal System --- */
function injectModal() {
    const modalHTML = `
    <div id="contactModal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h2>Let's Grow Together</h2>
                <p>Speak to an agricultural engineer today.</p>
            </div>
            <form class="contact-form" onsubmit="event.preventDefault(); alert('Thank you! Our team will contact you within 24 hours.'); toggleModal();">
                <div class="form-group">
                    <input type="text" placeholder="Full Name" required>
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Business Email" required>
                </div>
                <div class="form-group">
                    <select>
                        <option value="" disabled selected>Interested Solution</option>
                        <option value="aqua">Aquaculture</option>
                        <option value="hydro">Hydroponics</option>
                        <option value="integrated">Integrated Systems</option>
                        <option value="solar">Agrivoltaics</option>
                        <option value="indoor">Indoor Farming</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea placeholder="Tell us about your project..." rows="4"></textarea>
                </div>
                <button type="submit" class="cta-btn-large" style="width: 100%; border:none; cursor:pointer;">Send Request</button>
            </form>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Event Listeners for Modal
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Attach to all "Connect" or "Request Quote" buttons
    const triggerBtns = document.querySelectorAll('.btn-connect, .cta-btn-large');
    triggerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Check if it's a real link or a modal trigger
            if(btn.getAttribute('href') === '#' || btn.getAttribute('href') === '') {
                e.preventDefault();
                toggleModal();
            }
        });
    });

    closeBtn.addEventListener('click', toggleModal);
    
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            toggleModal();
        }
    });
}

function toggleModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.toggle('show-modal');
}
