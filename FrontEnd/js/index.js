async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works; 
}

async function init() {
    const works = await getWorks();
    console.log(works);
}

init();


