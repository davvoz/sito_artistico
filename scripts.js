gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.querySelector("#cursor");
const links = document.querySelectorAll("a, button");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

links.forEach(link => {
    link.addEventListener("mouseenter", () => cursor.classList.add("grow"));
    link.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
});

// Hero background animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('hero-background').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Glitch effect on scroll
gsap.to(".glitch, .glitch span", {
    textShadow: "0 0 10px rgba(255,0,255,0.5), 0 0 20px rgba(255,0,255,0.5), 0 0 30px rgba(255,0,255,0.5)",
    duration: 0.2,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Gallery items animation
gsap.utils.toArray('.gallery-item').forEach(item => {
    gsap.from(item, {
        opacity: 0,
        y: 100,
        rotation: 5,
        duration: 1,
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 50%",
            scrub: true
        }
    });
});

// About section animation
gsap.from(".about h2, .about p", {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        end: "top 50%",
        scrub: true
    }
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
}

prevButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

nextButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});