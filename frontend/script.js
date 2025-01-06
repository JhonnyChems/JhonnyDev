const backendUrl = 'http://localhost:3000'

    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('#navbar');

    menuIcon.onclick = () =>{
        menuIcon.classList.toggle('bx-x')
        navbar.classList.toggle('active')
    }

    //Formulario de informacion//*
    


    document.getElementById('contactForm').addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            subject: document.getElementById("subject").value,
            affair: document.getElementById("affair").value,
        };

        console.log('datos que se envian al backend', params)
    
        try {
            const response = await fetch(`${backendUrl}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            console.log('respuesta del servidor', response)
            await response.json();
            alert("El correo se ha enviado de manera exitosa");
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            alert("Error al enviar el correo. Por favor, inténtalo de nuevo.");
        }
    });
    
