import { useEffect } from 'react';

const InjectScript = () => {
    useEffect(() => {
        const scriptId = 'intastellar-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.innerHTML = `
        Intastellar.accounts.id.renderButton("login", {
          theme: "light",
        });
            function login(token) {
                token = JSON.stringify(token);
                sessionStorage.setItem('token', token);
                window.location.reload();
            }
      `;
            document.body.appendChild(script);
        }
    }, []);

    return null;
};

export default InjectScript;