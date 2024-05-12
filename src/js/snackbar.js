import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const delay = formData.get("delay");
    const state = formData.get("state");

    const createdPromise = new Promise((resolve, redject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                redject(delay);
            }
        }, delay)
    })
    createdPromise.then(delay => {
        iziToast.show({
        backgroundColor: 'LightGreen',
    title: '✅',
    message: `Fulfilled promise in ${delay}ms`
});;
}).catch(delay => {
    iziToast.show({
        backgroundColor: 'LightCoral',
       title: '❌',
    message: `Rejected promise in ${delay}ms` 
    })
});
});



            