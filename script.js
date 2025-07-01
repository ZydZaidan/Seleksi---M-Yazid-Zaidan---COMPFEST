function showPage(pageId) {

  const sections = document.querySelectorAll("main > section");
  sections.forEach((section) => section.style.display = "none");


  const target = document.getElementById(pageId);
  if (target) {
    target.style.display = "block";
  }


  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => link.classList.remove("active"));

  const activeLink = document.querySelector(`.nav-link[onclick*="${pageId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }


  const navLinks = document.getElementById("navLinks");
  if (window.innerWidth <= 768) {
    navLinks.style.display = "none";
  }
}

function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
}


window.onload = () => {
  showPage("home");
};

function openModal(title, description) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = description;
  document.getElementById("detailsModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("detailsModal").style.display = "none";
}


window.onclick = function (event) {
  const modal = document.getElementById("detailsModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


let currentIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showTestimonial(index) {
  testimonials.forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}, 5000);


document.getElementById("testimonialForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const review = document.getElementById("reviewMessage").value.trim();
  const rating = document.getElementById("rating").value;

  if (name && review && rating) {
    alert("Thank you for your testimonial, " + name + "!");
    this.reset();
  } else {
    alert("Please complete all fields.");
  }
});

const form = document.getElementById("subscriptionForm");
const plan = document.getElementById("plan");
const mealTypes = document.querySelectorAll(".meal-type");
const days = document.querySelectorAll(".day");
const priceDisplay = document.getElementById("priceDisplay");

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

function calculatePrice() {
  const planPrice = parseInt(plan.value || 0);
  const selectedMeals = Array.from(mealTypes).filter(c => c.checked).length;
  const selectedDays = Array.from(days).filter(c => c.checked).length;

  if (planPrice && selectedMeals && selectedDays) {
    const total = planPrice * selectedMeals * selectedDays * 4.3;
    priceDisplay.textContent = formatRupiah(total);
  } else {
    priceDisplay.textContent = "Rp0";
  }
}

plan.addEventListener("change", calculatePrice);
mealTypes.forEach(c => c.addEventListener("change", calculatePrice));
days.forEach(c => c.addEventListener("change", calculatePrice));

form.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for subscribing!");
  form.reset();
  priceDisplay.textContent = "Rp0";
});