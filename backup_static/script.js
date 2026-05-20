// Simple Reveal Animation on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Initial state for animations
document.querySelectorAll('section').forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(20px)';
    s.style.transition = 'all 0.6s ease-out';
});