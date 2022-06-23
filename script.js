const mobile_menu = document.querySelector(".mobile_menu");
const shortenedLinks_div = document.querySelector(".shortened_links .container")
const form = document.querySelector("form");
const errorMessage_span = document.querySelector(".error_message");
const input = document.getElementById("input");
// const copy_btn = document.getElementById("copy");
const links = JSON.parse(localStorage.getItem('links')) || [];

const showMenu = () => {
    mobile_menu.classList.toggle("show");
}

const addLink = (e) => {
    e.preventDefault();
    const link_entered = input.value;
    if (link_entered === "") {
        errorMessage_span.textContent = "Please add a link"
        input.style.border = "1px solid orangered"
        return
    };
    links.push(link_entered)
    populateLinks(links, shortenedLinks_div)
    localStorage.setItem('links', JSON.stringify(links));
    // this.reset();
}

const populateLinks = (links = [], linksList) => {
    const shortenLink = async(link) => {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
        const data = await res.json();
        let shortenedLink = `<div class="shortened">
                            <hr>
                            <p class="value_entered">${data.result.original_link}</p>
                            <div>
                                <a href="https://${data.result.short_link}" id="link_shortened">${data.result.short_link}</a>
                                <button id="copy" class="btn">Copy</button>
                            </div>
                        </div>
                        `
        shortenedLinks_div.innerHTML += shortenedLink
    }
    linksList.innerHTML = links.map((link) => {
        shortenLink(link)
    }).join("")
}

const CopyLink = (e) => {
    if (!e.target.matches("button")) return
    const el = e.target;
    const link = el.parentElement.querySelector("#link_shortened").textContent
    navigator.clipboard.writeText(link);

    // let start = Date.now();
    // let end = start + 3000;

    // const change = () => {
    //     start = Date.now();
    //     console.log(start, end)
    //     el.textContent = "copied!"
    //     if (start > end) clearInterval(timer)
    // }
    // el.textContent = "copy"
    // let timer = setInterval(change, 100)
}

form.addEventListener("submit", addLink)
shortenedLinks_div.addEventListener("click", CopyLink)

populateLinks(links, shortenedLinks_div)