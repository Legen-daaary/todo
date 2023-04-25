const todoDeleteButtons = document.querySelectorAll(".remove-todo");

todoDeleteButtons.forEach((todoDeleteButton) => {
    todoDeleteButton.addEventListener("click", (e) => {
        const button = e.target;
        const { id } = button;

        if (!id) {
            alert(`
                Sikertelen törlés!
                Hiányzó paraméter: id
            `);
            return;
        }

        const formData = new FormData();
        formData.append("id", id);

        fetch("app/remove.php", {
            method: "POST",
            body: formData
        })
            .then(res => {
                if (res.ok) {
                    button.parentElement.remove();
                } else {
                    alert("Hiba történt a törlés közben!");
                }
            });
    });
});

const todoCheckboxes = document.querySelectorAll(".check-box");

todoCheckboxes.forEach((todoCheckbox) => {
    todoCheckbox.addEventListener("click", (e) => {
        const checkbox = e.target;
        const id = checkbox.getAttribute("data-todo-id");

        if (!id) {
            alert(`
            Sikertelen módosítás!
            Hiányzó paraméter: id
        `);
            return;
        }

        const formData = new FormData();
        formData.append("id", id);

        fetch("app/check.php", {
            method: "POST",
            body: formData
        })
            .then(async res => {
                const text = await res.text();
                const h2 = checkbox.nextElementSibling;
                h2.classList.toggle("checked");
            });

    });
});