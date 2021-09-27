let inputs = document.querySelectorAll("input");
let form = document.querySelector("form");
let button = document.querySelector("button");
let rules = new Set();
document.querySelectorAll("[data-rule]").forEach((r) => { rules.add(r.getAttribute("data-rule")); });
const validate = (e = form) => { return e.checkValidity(); }
const validityFail = (e) => {
    e.preventDefault();
    let el = e.srcElement;
    let parent = el.parentElement;
    parent.classList.remove("hide");
    let validity = el.validity;
    for (let r of rules) {
        let err = parent.querySelector(`[data-rule="${r}"]`);
        if (err === null) continue;
        if (!validity[r])
            err.style.display = "none";
        else
            err.style.display = "block";
    }
};
const submitHandler = (e) => {
    e.preventDefault();
    let obj = {};
    inputs.forEach((i) => {
        obj[i.name] = i.value;
        i.value = "";
    });
    console.log(obj);
};
inputs.forEach((i) => {
    i.addEventListener("blur", (e) => {
        let el = e.target;
        if (el.value === "") {
            let parent = el.parentElement;
            parent.classList.add("hide");
            let errors = parent.querySelectorAll("[data-rule]");
            errors.forEach((e) => {
                e.style.display = "none";
            });
        }
        else
            validate(el);
    });
    i.addEventListener("invalid", validityFail);
});
button.addEventListener("keypress", (e) => {
    e.preventDefault();
    if (validate()) {
        form.submit();
    }
});
form.addEventListener("submit",submitHandler);

