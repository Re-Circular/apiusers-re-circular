//monitora o envio do formulário

document.querySelector("#main-form").addEventListener("submit", (event) => {
    event.preventDefault();

    console.log(event.target.value);
})