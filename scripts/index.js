// State
let photos = [];

const paginationParams = {
  per_page: 30,
  page: 1,
};

// Constants

const API_URL = "https://api.unsplash.com";

const API_KEY = "N02X3WfRqFebGeSgKmrJasrqXDXmeSal72qaFl4V8tI";

// Dom Elements
const cardsSectionElement = document.getElementById("images__container");

// Event Listeners

// Functions

async function fetchImages() {
  const queryParams = getPayload();
  try {
    const apiURL = `${API_URL}/photos/?` + queryParams;
    const response = await fetch(apiURL);
    const data = await response.json();
    data && setImages(data);
  } catch (error) {
    console.error(error);
  }
}

function getPayload() {
  const queryParams = new URLSearchParams({
    client_id: API_KEY,
    per_page: paginationParams.per_page,
    page: paginationParams.page,
    order_by: "popular",
  });

  return queryParams.toString();
}

function setImages(response) {
  const imagesWithDescription = response.filter(
    (image) => image.description || image.alt_description
  );
  photos = imagesWithDescription;
  renderUI();
}

function renderUI() {
  photos.forEach((photo) => {
    const cardNode = getCardNodeHTML(photo);
    cardsSectionElement.appendChild(cardNode);
  });
}

function getCardNodeHTML(photo) {
  // Card container
  const cardContainerElement = document.createElement("div");
  setAttributesOfDomNode(cardContainerElement, { class: "card" });

  // Image
  const imageElement = document.createElement("img");
  setAttributesOfDomNode(imageElement, {
    width: "100%",
    class: "card__img",
    src: photo.urls?.regular,
    alt: photo.description || photo.alt_description,
  });

  // Card body
  const cardBodyElement = document.createElement("div");
  setAttributesOfDomNode(cardBodyElement, { class: "card__body font-bold" });

  // Card title
  const cardTitleElement = document.createElement("h4");
  setAttributesOfDomNode(cardTitleElement, {
    class: "text-2xl card__title break-word capitalize line-clamp-2",
  });
  cardTitleElement.textContent = photo.description || photo.alt_description;

  // Card description
  const cardDescriptionElement = document.createElement("p");
  setAttributesOfDomNode(cardDescriptionElement, {
    class: "card__description mt-4",
  });
  cardDescriptionElement.textContent = photo.user?.name;

  cardBodyElement.append(cardTitleElement, cardDescriptionElement);
  cardContainerElement.append(imageElement, cardBodyElement);

  return cardContainerElement;
}

function setAttributesOfDomNode(domNode, attributes) {
  for (let attributeName in attributes) {
    domNode.setAttribute(attributeName, attributes[attributeName]);
  }
}

// On load
fetchImages();
