async function getAbout(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/about/find/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch ABOUT data from the database.");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error fetching data:", err);
    throw err;
  }
}

const faqContainer = document.querySelector(".faq-content");
const product = document.getElementById("products-container");
const aboutProducts = document.querySelector(".button-about-products");
aboutProducts.addEventListener("click", function (e) {
  console.log(1);
  aboutId = e.target.id;

  let aboutData = getAbout(aboutId).then((result) => {
    console.log(result);
    const title = result.title;
    const description = result.description;

    let textContent = `
      <div class="about-text">
        <div class="about-text-title">${title}</div>
        <div class="about-text-description">${description}</div>
      </div>
    `;

    let clean = document.querySelector(".about-text");
    if (clean != null) {
      faqContainer.removeChild(clean);
    }
    faqContainer.insertAdjacentHTML("beforeend", textContent);

    return result;
  });
});

const staff = document.getElementById("staff-container");
const aboutStaff = document.querySelector(".button-about-staff");
aboutStaff.addEventListener("click", function (e) {
  console.log(2);
  aboutId = e.target.id;
  let aboutData = getAbout(aboutId).then((result) => {
    console.log(result);
    const title = result.title;
    const description = result.description;

    let textContent = `
      <div class="about-text">
        <div class="about-text-title">${title}</div>
        <div class="about-text-description">${description}</div>
      </div>
    `;

    let clean = document.querySelector(".about-text");
    if (clean != null) {
      faqContainer.removeChild(clean);
    }
    faqContainer.insertAdjacentHTML("beforeend", textContent);
    return result;
  });
});

const contact = document.getElementById("contact-container");
const aboutContact = document.querySelector(".button-about-contact");
aboutContact.addEventListener("click", function (e) {
  console.log(3);
  aboutId = e.target.id;
  let aboutData = getAbout(aboutId).then((result) => {
    console.log(result);
    const title = result.title;
    const description = result.description;

    let textContent = `
      <div class="about-text">
        <div class="about-text-title">${title}</div>
        <div class="about-text-description">${description}</div>
      </div>
    `;

    let clean = document.querySelector(".about-text");
    if (clean != null) {
      faqContainer.removeChild(clean);
    }
    faqContainer.insertAdjacentHTML("beforeend", textContent);
    return result;
  });
});

const locations = document.getElementById("location-container");
const aboutLocation = document.querySelector(".button-about-location");
aboutLocation.addEventListener("click", function (e) {
  console.log(4);
  aboutId = e.target.id;
  let aboutData = getAbout(aboutId).then((result) => {
    console.log(result);
    const title = result.title;
    const description = result.description;

    let textContent = `
      <div class="about-text">
        <div class="about-text-title">${title}</div>
        <div class="about-text-description">${description}</div>
      </div>
    `;

    let clean = document.querySelector(".about-text");
    if (clean != null) {
      faqContainer.removeChild(clean);
    }
    faqContainer.insertAdjacentHTML("beforeend", textContent);
    return result;
  });
});
