
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
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
        
            
            const res = await response.json();
        
            
            if (res.state === false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ouch',
                    text: res.mensaje,
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: '¡Qué bien!',
                    text: res.mensaje,
                });
                $('#editProducto').modal('hide');
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
    
