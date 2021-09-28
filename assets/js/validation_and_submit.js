let inputs = document.querySelectorAll("input");
let form = document.querySelector("form");
let button = document.querySelector("button");
const validate = (e = form) => {
    let validity= e.checkValidity();
    let parent = e.parentElement;
    if(validity)
    {
        if (e === form)
            e.querySelectAll(".input-and-errors").forEach((i) => {
                i.classList.add("hide");
            });
        else parent.classList.add("hide");
        parent.querySelectorAll("[data-rule]").forEach((r)=>{
            r.style.display="none";
        });
	}
    return validity; 
};
const validityFail = (e) => {
    e.preventDefault();
    let el = e.srcElement;
    let parent = el.parentElement;
    parent.classList.remove("hide");
    let validity = el.validity;
    let errs = parent.querySelectorAll(`[data-rule]`);
    let r;
    errs.forEach((err)=>{
        r=err.getAttribute("data-rule");
        if (!validity[r])
            err.style.display = "none";
        else
            err.style.display = "block";
    });
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

