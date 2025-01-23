const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar'); // Asegúrate de que el selector esté correcto

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Formulario de contacto
document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const affair = document.getElementById("affair").value;


    if (name === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "El campo nombre es obligatorio",
        });
        return;
    }

    if (email === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "El campo email es obligatorio",
        });
        return;
    }

    if (phone === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "El campo teléfono es obligatorio",
        });
        return;
    }

    const params = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        affair: affair,
    };

    console.log('Datos enviados al backend:', params);

    try {
        
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        
        const res = await response.json();

        // Mostrar un mensaje según el estado de la respuesta
        if (res.state === false) {
            Swal.fire({
                icon: 'error',
                title: 'Ouch',
                text: "Error al enviar el correo, por favor intente nuevamente",
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: '¡Que bien!',
                text: "Mensaje enviado con éxito, pronto nos comunicaremos contigo",
            });
        }

    } catch (error) {
        console.error("Error al enviar el correo:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al enviar el correo. Por favor, inténtalo de nuevo.',
        });
    }
});


const skillBoxes = document.querySelectorAll('.skill-box');
const container = document.querySelector('.skills-container');


const boxSize = 120;


function getRandomPosition() {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    
    const randomX = Math.random() * (containerWidth - boxSize); 
    const randomY = Math.random() * (containerHeight - boxSize);

    return { randomX, randomY };
}


function isOverlapping(box, newX, newY) {
    const boxRect = box.getBoundingClientRect();

    for (let otherBox of skillBoxes) {
        if (otherBox !== box) {
            const otherBoxRect = otherBox.getBoundingClientRect();
            if (
                newX < otherBoxRect.right &&
                newX + boxRect.width > otherBoxRect.left &&
                newY < otherBoxRect.bottom &&
                newY + boxRect.height > otherBoxRect.top
            ) {
                return true;
            }
        }
    }
    return false;
}


function moveRandomly() {
    skillBoxes.forEach((box) => {
        let { randomX, randomY } = getRandomPosition();

        
        while (isOverlapping(box, randomX, randomY)) {
            ({ randomX, randomY } = getRandomPosition());
        }

        
        box.style.left = `${randomX}px`;
        box.style.top = `${randomY}px`;
    });
}


skillBoxes.forEach((box) => {
    let { randomX, randomY } = getRandomPosition();
    box.style.left = `${randomX}px`;
    box.style.top = `${randomY}px`;
});


setInterval(moveRandomly, 2000);